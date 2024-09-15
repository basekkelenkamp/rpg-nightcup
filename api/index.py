from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from api.google_sheets import get_google_sheets_data
from api.parsing.cup_parser import CupsParser

app = FastAPI()


@app.get("/api/nightcup-sheet-data")
async def get_nightcup_sheet_data():
    print("Fetching data from the Google Sheet...")
    try:
        data = get_google_sheets_data()
        cups_parser = CupsParser(data["cups_raw"][9:])
        return jsonable_encoder(cups_parser.cups_parsed)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
