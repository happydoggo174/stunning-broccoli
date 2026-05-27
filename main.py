from fastapi import FastAPI,staticfiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
app=FastAPI() 
app.add_middleware(CORSMiddleware,allow_origins=("*"),allow_methods=("*"),allow_headers=("*"))
@app.middleware("http")
async def get_home(r,call_next):
    if(r.url._url in ("http://localhost:8000/","http://127.0.0.1:8000/")):return FileResponse("index.html")
    return await call_next(r)
app.mount("/",staticfiles.StaticFiles(directory="./"))
uvicorn.run(app)
