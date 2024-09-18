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


def get_google_sheets_cup_data():
    # Fetch the spreadsheet data including cell data and formatting
    result = service.spreadsheets().get(
        spreadsheetId=SPREADSHEET_ID,
        ranges=[f"{SHEET_NAME}!A1:ZZ56"],
        includeGridData=True
    ).execute()
    sheet = result['sheets'][0]
    data = sheet['data'][0]
    rows = data.get('rowData', [])

    # Process the rows to extract the values with hyperlinks combined
    values = []
    for row in rows:
        row_values = []
        for cell in row.get('values', []):
            cell_value = get_cell_value_with_hyperlink(cell)
            row_values.append(cell_value)
        values.append(row_values)

    if not values:
        raise ValueError("No raw_cup_data found in the sheet.")

    print("Data fetched successfully.")
    return transpose_data(values[:57])


def get_google_sheets_stats_data():
    result = service.spreadsheets().values().get(
        spreadsheetId=SPREADSHEET_ID,
        range=f"{SHEET_NAME}!A58:F1000"
    ).execute()
    values = result.get('values', [])
    raw_stats_data = transpose_data(values)

    return transpose_data(values)


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


def get_cell_value_with_hyperlink(cell):
    cell_value = ''
    cell_hyperlink = None
    if 'formattedValue' in cell:
        cell_value = cell['formattedValue']
    if 'hyperlink' in cell:
        cell_hyperlink = cell['hyperlink']
    elif 'textFormatRuns' in cell:
        for run in cell['textFormatRuns']:
            if 'format' in run and 'link' in run['format']:
                cell_hyperlink = run['format']['link'].get('uri')
                break  # Take the first hyperlink found
    if cell_hyperlink:
        return f'{cell_hyperlink}$$${cell_value}'
    else:
        return cell_value
