FROM python:3.11-slim-buster

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install pip requirements
COPY requirements.txt .
RUN python -m pip install -r requirements.txt
# RUN python -m spacy download en_core_web_lg
RUN python -m nltk.downloader stopwords
RUN python -m nltk.downloader punkt
RUN python -m nltk.downloader wordnet
RUN python -m nltk.downloader omw-1.4

WORKDIR /usr/src/app
COPY . /usr/src/app

ENTRYPOINT ["uvicorn","app.main:app","--port","8000","--host","0.0.0.0"]