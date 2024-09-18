from functools import lru_cache
import time
from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from api.google_sheets import get_google_sheets_cup_data, get_google_sheets_stats_data
from api.parsing.cup_parser import CupsParser
from api.parsing.stats_parser import StatsParser

app = FastAPI()


@lru_cache(maxsize=1)
def cached_google_cup_data():
    print("Fetching data from the Google Sheet...")
    raw_cup_data = get_google_sheets_cup_data()
    cups_parser = CupsParser(raw_cup_data[9:])
    response = jsonable_encoder(cups_parser.cups_parsed)
    return response


@lru_cache(maxsize=1)
def cached_google_stats_data():
    print("Fetching stats data from the Google Sheet...")
    raw_cup_data = get_google_sheets_stats_data()
    stats_parser = StatsParser(raw_cup_data)
    return stats_parser.get_stats()


@app.get("/api/nightcup-cup-data")
async def get_nightcup_cup_data():
    start_time = time.time()
    try:
        response = cached_google_cup_data()
        elapsed_time = time.time() - start_time
        print(f"Data fetched and processed in {elapsed_time:.2f} seconds")
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/nightcup-stats-data")
async def get_nightcup_stats_data():
    start_time = time.time()
    try:
        response = cached_google_stats_data()
        elapsed_time = time.time() - start_time
        print(f"Stats data fetched and processed in {elapsed_time:.2f} seconds")
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
