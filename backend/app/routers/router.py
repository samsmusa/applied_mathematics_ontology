from fastapi import APIRouter

from app.routers import router_crud

api_router = APIRouter()
api_router.include_router(router_crud.router, tags=["Basic-Crud_OP"], prefix="/crud")


@api_router.get("/ping")
def pong():
    return {"ping": "pong!"}
