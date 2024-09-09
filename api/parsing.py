from dataclasses import dataclass


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
    top_3: list[str] | None


@dataclass
class Cup:
    title: str
    date: str
    modes: list[str]
    map: Map
    admin: str
    stages: list[CupStage]
    pre_tm2: bool


@dataclass
class CupsParser:
    cups_raw: list[list[str]]
    cups_parsed: list[Cup] = None

    def __post_init__(self):
        self.cups_parsed = self.parse_raw_cups()

    def parse_raw_cups(self):
        print("Parsing raw cups...")
        for i, col in enumerate(self.cups_raw):
            if col[1] == "" and col[2] == "MAP":
                self._calculate_cup(i)
                # self.cups_parsed.append(self._calculate_cup(i))
        return []

    def _calculate_cup(self, start_i):
        def determine_cup_col_len():
            for j, col in enumerate(self.cups_raw[start_i + 1:]):
                if col[1] == "" and col[2] == "MAP":
                    return j
            return len(self.cups_raw) - start_i

        def extract_cup_stages(stage_cols):
            for i, col in enumerate(stage_cols):
                print(col[4:])
            return []

        def determine_admin():
            if self.cups_raw[start_i][0] == "ADMIN":
                return self.cups_raw[start_i + 2][0]

            for col in reversed(self.cups_raw[:start_i]):
                if col[0] != "":
                    return col[0]
            return []

        row_len = determine_cup_col_len()
        cup_columns = self.cups_raw[start_i:start_i + row_len]

        title = cup_columns[1][1]
        map = cup_columns[1][2]
        date = cup_columns[1][3]
        admin = determine_admin()

        stages = extract_cup_stages(cup_columns[1:])
        print(f"{title=}, {map=}, {date=}, {row_len=}, {admin=}, {stages=}")
        return []
