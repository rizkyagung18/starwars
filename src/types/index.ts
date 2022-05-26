export interface Film {
  title: string;
  characters: [string];
}

export interface People {
  name: string;
  height: string;
  birth_year: string;
  gender: string;
  films: [string];
  vehicles: [string];
  starships: [string];
}

export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}