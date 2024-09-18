from api.google_sheets import get_google_sheets_cup_data, get_google_sheets_stats_data
from api.parsing.cup_parser import CupsParser
from api.parsing.stats_parser import StatsParser


if __name__ == "__main__":
    # raw_cup_data = get_google_sheets_cup_data()
    # cups_parser = CupsParser(raw_cup_data[9:])
    # print(cups_parser)

    raw_stats_data = get_google_sheets_stats_data()
    cups_parser = StatsParser(raw_stats_data)

    all_stats = cups_parser.get_stats()
    print(cups_parser)
