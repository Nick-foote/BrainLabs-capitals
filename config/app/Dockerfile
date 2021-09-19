FROM python:3.8-slim
LABEL MAINTAINER="Nick Foote"

ENV PYTHONUNBUFFERED 1
ENV LANG C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive
ENV PATH="/scripts:${PATH}"

COPY ./requirements /requirements

RUN apt-get update && apt-get install -qq -y python3-dev 
    
RUN pip3 install --upgrade pip && \
    pip install -r /requirements/requirements.txt && \
    mkdir /app

COPY . /app
WORKDIR /app

COPY ./scripts /scripts
RUN chmod +x /scripts/*

# TODO: Add Docker user

CMD ["entrypoint.sh"]
