import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { type Pokemon, type PokemonDetails, type PokemonListItem } from '../types/Pokemon';


export const fetchPokemons = createAsyncThunk<Pokemon[], number>(
    'pokemon/fetchPokemons',
    async (page: number) => {
      const offset = (page - 1) * 20;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=9`);
      const results: Pokemon[] = await Promise.all(
        (response.data.results as PokemonListItem[]).map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            id: details.data.id,
            name: details.data.name,
            height: details.data.height,
            image: details.data.sprites.front_default,
          };
        })
      );      
      return results;
    }
  );

export const fetchPokemonDetails = createAsyncThunk<PokemonDetails, string>(
  'pokemon/fetchPokemonDetails',
  async (name: string) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return {
      id: response.data.id,
      name: response.data.name,
      height: response.data.height,
      image: response.data.sprites.front_default,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      abilities: response.data.abilities.map((a: any) => a.ability.name),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stats: response.data.stats.map((s: any) => ({
        name: s.stat.name,
        value: s.base_stat
      })),
    };
  }
);
  

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
      pokemons: [] as Pokemon[],
      loading: false,
      error: null as string | null,
      page: 1,
      pokedex: [] as Pokemon[],
      pokemonDetails: null as PokemonDetails | null,
    },
    reducers: {
        addToPokedex: (state, action: PayloadAction<Pokemon>) => {
          const exists = state.pokedex.find(p => p.id === action.payload.id);
          if (!exists) {
            state.pokedex.push(action.payload);
          }
        },
        setPage: (state, action: PayloadAction<number>) => {
          state.page = action.payload;
        },
      },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPokemons.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPokemons.fulfilled, (state, action) => {
          state.loading = false;
          state.pokemons = action.payload;
        })
        .addCase(fetchPokemons.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Algo deu errado';
        })
        .addCase(fetchPokemonDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPokemonDetails.fulfilled, (state, action: PayloadAction<PokemonDetails>) => {
          state.loading = false;
          state.pokemonDetails = action.payload;
        })
        .addCase(fetchPokemonDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Erro ao buscar detalhes do Pokémon';
        });
        
    },
  });
  

export const { addToPokedex, setPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;
