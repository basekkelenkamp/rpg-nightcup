from api.google_sheets import get_google_sheets_cup_data
from api.parsing.cup_parser import CupsParser


if __name__ == "__main__":
    raw_cup_data = get_google_sheets_cup_data()
    cups_parser = CupsParser(raw_cup_data[9:])
    print(cups_parser)
