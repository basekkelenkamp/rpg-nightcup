export interface Map {
    name: string;
    url: string;
    author: string;
  }
  
export interface CupStage {
mode: string;
vod_url: string | null;
vod_author: string | null;
players: string[];
}

export interface Cup {
title: string;
date: string;
map: Map;
admin: string;
stages: CupStage[];
pre_tm2: boolean;
top_3: string[];
}
