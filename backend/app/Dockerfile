FROM python:3.11-buster

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6 -y
RUN pip install poetry==1.4.0 && \
    poetry config virtualenvs.create false && \
    make deps

CMD ["make", "run_open"]
