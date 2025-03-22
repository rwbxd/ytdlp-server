FROM python:3.13-alpine

RUN apk -U add yt-dlp
COPY . .
RUN pip install "fastapi[standard]"
RUN mkdir -p output

ENTRYPOINT ./entrypoint.sh