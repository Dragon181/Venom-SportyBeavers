from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.v1.routers import (beavers, battles, onboardings, users, whacks, lootboxes)

app = FastAPI(
    title="SportyBeavers API",
    version="1.0.0",
)

origins = [
    "http://localhost:10888",
    "http://localhost:10889",
    "http://venom-front.sportybeavers.com",
    "https://localhost:10888",
    "https://localhost:10889",
    "https://venom-front.sportybeavers.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers",
                   "Access-Control-Allow-Origin", "Authorization",
                   "Accept",
                   "Accept-Encoding",
                   "Accept-Language",
                   "Content-Length",
                   "Dnt",
                   "Origin",
                   "Referer",
                   "Sec-Ch-Ua",
                   "Sec-Ch-Ua-Mobile",
                   "Sec-Ch-Ua-Platform",
                   "Sec-Fetch-Dest",
                   "Sec-Fetch-Mode",
                   "Sec-Fetch-Site",
                   "User-Agent",
                   ],
)

app.include_router(users.router, tags=["Users"])
app.include_router(beavers.router, tags=["Beavers"])
app.include_router(battles.router, tags=["Battles"])
app.include_router(onboardings.router, tags=["Onboardings"])
app.include_router(whacks.router, tags=["Whacks"])
app.include_router(lootboxes.router, tags=["Lootboxes"])


@app.options("/{path:path}")
async def options_handler(path: str):
    return {
        "allowed-methods": ["GET", "POST", "PUT", "OPTIONS"]
    }
