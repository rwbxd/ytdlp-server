import subprocess
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class YTRequest(BaseModel):
    url: str


@app.post("/download")
def download(request: YTRequest):
    print("Downloading following URL: " + request.url)
    return subprocess.run(
        [f'yt-dlp -o "output/%(title)s.%(ext)s" {request.url}'],
        capture_output=True,
        shell=True,
    )


@app.get("/ls")
def ls(path: str = "."):
    return subprocess.run([f"ls {path}"], capture_output=True, shell=True)
