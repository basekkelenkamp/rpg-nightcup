from http.client import HTTPException
from googleapiclient.discovery import build
from google.oauth2 import service_account
import os
import json
from dotenv import load_dotenv

load_dotenv()

credentials_json = os.getenv('GOOGLE_APPLICATION_CREDENTIALS_JSON')
if credentials_json is None:
    raise Exception("The GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable is not set.")

credentials_info = json.loads(credentials_json)
credentials = service_account.Credentials.from_service_account_info(credentials_info)
SPREADSHEET_ID = '1gwA4t40UkzgbTplMDfFlU_wRs77BctlHAld9YksNNt0'
SHEET_NAME = 'TMNF&TM² RPG Titlepack || RPG Nightcups 2010-'
service = build('sheets', 'v4', credentials=credentials)

def get_google_sheets_data():
    try:
        result = service.spreadsheets().values().get(spreadsheetId=SPREADSHEET_ID, range=SHEET_NAME).execute()
        values = result.get('values', [])

        if not values:
            return {"message": "No data found in the sheet."}

        # Transpose rows to columns
        transposed_data = transpose_data(values)

        return transposed_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def transpose_data(data):
    # Determine the maximum number of columns in any row
    max_length = max(len(row) for row in data)

    # Initialize the transposed data with empty lists for each column
    transposed_data = [[] for _ in range(max_length)]

    # Fill the transposed data by iterating over each row and each column
    for row in data:
        for i in range(max_length):
            if i < len(row):
                transposed_data[i].append(row[i])
            else:
                transposed_data[i].append('')  # Fill with empty string if the row is shorter

    return transposed_data
