import subprocess
import re
from fastapi import FastAPI, Response, HTTPException
from pydantic import BaseModel

app = FastAPI()


class YTRequest(BaseModel):
    url: str
    subfolder: str = '/'
    format: str = 'mp4'
    res: str = '1080'

allowed_subfolders = ('/')

@app.post("/download")
def download(request: YTRequest, response: Response):
    request.subfolder = re.sub(r'/+', '/', f"/{request.subfolder}/")
    if request.subfolder not in allowed_subfolders:
        response.status_code = 403
        return 'Subfolder is not on the list of allowed subfolders.'
    completed_process = subprocess.run(
        ['yt-dlp',
         '-o',
         'output' + request.subfolder + f'%(title)s-%(resolution)s.%(ext)s',
         '-S',
         f'ext:{request.format},res:{request.res}',
         request.url],
        capture_output=True
    )
    return completed_process.stdout.decode(errors='replace')

@app.get("/allowed_subfolders")
def get_allowed_subfolders():
    return list(allowed_subfolders)

@app.get("/list_output")
def list_output(path: str = ""):
    path = re.sub(r'/+', '/', f"/{path}/")
    if path not in allowed_subfolders:
        raise HTTPException(status_code=403, detail="Subfolder is not on the list of allowed subfolders.")
    print(f"calling ls for output{path}")
    try:
        return subprocess.run(["ls", f"output{path}"], capture_output=True).stdout.decode(errors="replace").split("\n")
    except:
        return subprocess.run(["dir", f"output{path.rstrip('/')}", "/b"], capture_output=True, shell=True).stdout.decode(errors="replace").split("\r\n")
