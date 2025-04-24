FROM node:23-slim as build-step
ADD ./client /client
WORKDIR /client
RUN npm install && npm run build

FROM python:3.13-alpine
COPY --from=build-step /client/dist /client/dist
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

RUN apk -U add yt-dlp

ADD ./server /server
WORKDIR /server
RUN uv sync --locked
RUN chmod +x entrypoint.sh

EXPOSE 8000

ENTRYPOINT ./entrypoint.sh