from fastapi import FastAPI, HTTPException
from api.google_sheets import get_google_sheets_data

app = FastAPI()


@app.get("/api/nightcup-sheet-data")
async def get_nightcup_sheet_data():
    print("Fetching data from the Google Sheet...")
    try:
        data = get_google_sheets_data()
        return data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
