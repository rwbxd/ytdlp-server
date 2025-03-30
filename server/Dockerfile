FROM python:3.12-alpine
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

RUN apk -U add yt-dlp
COPY . .
RUN uv sync --frozen --no-cache
RUN mkdir -p output
RUN chmod +x entrypoint.sh

ENTRYPOINT ./entrypoint.sh