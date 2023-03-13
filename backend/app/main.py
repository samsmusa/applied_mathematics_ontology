from fastapi import FastAPI
from fastapi.openapi.docs import (
    get_swagger_ui_html,
    get_swagger_ui_oauth2_redirect_html,
)
from fastapi.staticfiles import StaticFiles

from app.core.config import DevelopmentConfig, ProductionConfig, TestConfig
from app.core.database import engine
from app.models import RDB as models

import logging
import os
import time

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers.router import api_router


def get_app(test_config=None) -> FastAPI:
    models.Base.metadata.create_all(bind=engine)
    settings = load_config(test_config)
    fast_app = FastAPI(
        # servers=[
        #     {"url": "/", "description": "localhost"},
        #     {
        #         "url": "http://ai.shared.local",
        #         "description": "ai.shared.local",
        #     },
        # ],
        title=settings.APP_NAME, version=settings.APP_VERSION, debug=settings.IS_DEBUG)

    fast_app.state.config = settings
    fast_app.mount("/static", StaticFiles(directory="static"), name="static")
    origins = ["http://localhost:3000", "http://localhost:8000", "*"]

    fast_app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"],
                            allow_headers=["*"], )
    setup_routes(fast_app)
    return fast_app


def load_config(test_config):
    """
    Load the configuration from the environment
    """
    env = os.getenv("APP_ENVIRONMENT", "development")
    if test_config is not None:
        env = test_config['env']
    if env == "development":
        return DevelopmentConfig()
    elif env == "production":
        return ProductionConfig()
    elif env == "testing":
        return TestConfig()
    else:
        raise ValueError(f"Invalid APP_ENVIRONMENT value: {env}")


def setup_routes(fast_app: FastAPI):
    """Register routes."""

    fast_app.include_router(api_router, prefix=fast_app.state.config.API_PREFIX)


app = get_app()

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/api", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title + " - Swagger UI",
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url,
        swagger_js_url="/static/swagger-ui-bundle.js",
        swagger_css_url="/static/swagger-ui.css",
    )


@app.get(app.swagger_ui_oauth2_redirect_url, include_in_schema=False)
async def swagger_ui_redirect():
    return get_swagger_ui_oauth2_redirect_html()


@app.middleware("http")
async def add_process_time_header(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(f'{process_time:0.4f} sec')
    return response


if __name__ == '__main__':
    uvicorn.run('main:app', host="0.0.0.0", port=8000, reload=True, log_level="info", )
