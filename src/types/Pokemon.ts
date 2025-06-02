export interface Pokemon {
    id: number;
    name: string;
    height: number;
    image: string;
  }
  
  export interface PokemonListItem {
    name: string;
    url: string;
  }

  export interface PokemonDetails extends Pokemon {
    abilities: string[];
    stats: Stat[];
  }