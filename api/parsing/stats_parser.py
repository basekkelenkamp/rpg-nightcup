
from dataclasses import dataclass, field


@dataclass
class StatsParser:
    stats_raw: list[list[str]]
    most_victories: list[tuple] = field(default_factory=list)
    most_podiums: list[tuple] = field(default_factory=list)
    most_qualifications: list[tuple] = field(default_factory=list)
    most_appearances: list[tuple] = field(default_factory=list)

    def __post_init__(self):
        self.parse_raw_stats()

    def get_stats(self) -> dict[str, list[tuple]]:
        return {
            "most_victories": self.most_victories,
            "most_podiums": self.most_podiums,
            "most_qualifications": self.most_qualifications,
            "most_appearances": self.most_appearances,
        }

    def parse_raw_stats(self):
        print("Parsing raw stats...")
        raw = self.stats_raw
        if raw[0][1] != "Most Victories":
            raise ValueError("Invalid 'Most victories' stats data format.")
        if raw[3][1] != "Most Podiums":
            raise ValueError("Invalid 'Most Podiums' stats data format.")
        if "Most Qualifications" not in raw[0][13]:
            raise ValueError("Invalid 'Most qualifications' stats data format.")
        if "Most Appearances" not in raw[3][13]:
            raise ValueError("Invalid 'Most appearances' stats data format.")

        def append_stats(target_list, players_row, amounts_row):
            for player, amount in zip(players_row, amounts_row):
                if player == "":
                    break
                target_list.append((player, int(amount)))

        append_stats(self.most_victories, raw[1][2:12], raw[2][2:12])
        append_stats(self.most_podiums, raw[4][2:12], raw[5][2:12])
        append_stats(self.most_qualifications, raw[1][14:], raw[2][14:])
        append_stats(self.most_appearances, raw[4][14:], raw[5][14:])
