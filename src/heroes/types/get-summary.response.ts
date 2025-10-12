import type { Hero } from "./Get-hero.response";

export interface summary {
    total:    number;
    heroes:   number;
    villains: number;
    byGender: ByGender;
    stats:    Stats;
}

export interface ByGender {
    male:   number;
    female: number;
    other:  number;
}

export interface Stats {
    avgPower:        number;
    maxStrength:     number;
    maxIntelligence: Hero;
}


