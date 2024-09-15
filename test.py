from api.google_sheets import get_google_sheets_data
from api.parsing.cup_parser import CupsParser


if __name__ == "__main__":
    data = get_google_sheets_data()
    cups_parser = CupsParser(data["cups_raw"][9:])
    print(cups_parser)
