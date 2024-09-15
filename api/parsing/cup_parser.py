from dataclasses import field, dataclass
from datetime import datetime


DATE_FORMATS = ["%d/%m/%Y", "%Y-%m-%d"]

@dataclass
class Map:
    name: str
    url: str
    author: str


@dataclass
class CupStage:
    mode: str
    vod_url: str | None
    vod_author: str | None
    players: list[str]


@dataclass
class Cup:
    title: str
    date: datetime | str
    map: Map
    admin: str
    stages: list[CupStage]
    pre_tm2: bool
    top_3: list[str] = field(default_factory=list)


def parse_url_and_value(url_value: str) -> tuple[str | None, str]:
    if "$$$" not in url_value:
        return None, url_value
    url, value = url_value.split("$$$")
    return url, value


def _parse_date(date_str):
    for fmt in DATE_FORMATS:
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            print(f"Warning: Date '{date_str}' is in an unrecognized format.")
            continue
    return date_str


@dataclass
class CupsParser:
    cups_raw: list[list[str]]
    cups_parsed: list[Cup] = field(default_factory=list)

    def __post_init__(self):
        self.parse_raw_cups()

    def parse_raw_cups(self):
        print("Parsing raw cups...")
        for i, col in enumerate(self.cups_raw):
            if col[1] == "" and col[2] == "MAP":
                self.cups_parsed.append(self._calculate_cup(i))
                print(f"Parsed cup {self.cups_parsed[-1].title}")

        self.cups_parsed.sort(key=lambda cup: cup.date, reverse=True)

    def _calculate_cup(self, start_i) -> Cup:
        def determine_cup_col_len() -> int:
            for j, col in enumerate(self.cups_raw[start_i + 1:]):
                if col[1] == "" and col[2] == "MAP":
                    return j
            return len(self.cups_raw) - start_i

        def extract_cup_stages(stage_cols) -> list[CupStage]:
            cup_stages: list[CupStage] = []
            for i, col in enumerate(stage_cols):
                if col[5] == "":
                    continue
                url, url_value = parse_url_and_value(col[4])
                cup_stages.append(
                    CupStage(
                        mode=col[5],
                        vod_url=url,
                        vod_author=url_value,
                        players=list(filter(None, col[6:])),
                    ))
            return cup_stages

        def determine_admin() -> str:
            if self.cups_raw[start_i][0] == "ADMIN":
                return self.cups_raw[start_i + 2][0]

            for col in reversed(self.cups_raw[:start_i]):
                if col[0] != "":
                    return col[0]
            return "Unknown"

        row_len = determine_cup_col_len()
        cup_columns = self.cups_raw[start_i:start_i + row_len]

        title = cup_columns[1][1]
        map_url, map_name_author = parse_url_and_value(cup_columns[1][2])
        map_name, map_author = map_name_author.split(" by ") if " by " in map_name_author else (map_name_author, "")
        admin = determine_admin()
        stages = extract_cup_stages(cup_columns[1:])

        date_str = cup_columns[1][3]
        date = _parse_date(date_str)

        return Cup(
            title=title,
            date=date,
            map=Map(name=map_name, url=map_url, author=map_author),
            admin=admin,
            stages=stages,
            pre_tm2=False,
            top_3=stages[-1].players[:3],
        )
