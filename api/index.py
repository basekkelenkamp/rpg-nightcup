from functools import lru_cache
import time
from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from api.google_sheets import get_google_sheets_data
from api.parsing.cup_parser import CupsParser

app = FastAPI()


@lru_cache(maxsize=1)
def cached_google_sheets_data():
    print("Fetching data from the Google Sheet...")
    data = get_google_sheets_data()
    cups_parser = CupsParser(data["cups_raw"][9:])
    response = jsonable_encoder(cups_parser.cups_parsed)
    return response

@app.get("/api/nightcup-sheet-data")
async def get_nightcup_sheet_data():
    start_time = time.time()
    try:
        response = cached_google_sheets_data()
        elapsed_time = time.time() - start_time
        print(f"Data fetched and processed in {elapsed_time:.2f} seconds")
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
