import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/Store';
import { fetchPokemons, addToPokedex, setPage } from '../redux/PokemonSlice';
import { Card, CardMedia, CardContent, Typography, Button, Grid, CircularProgress, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Pokemon } from '../types/Pokemon';


const ListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemons, loading, page, pokedex } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons(page));
  }, [dispatch, page]);

  const handleAddToPokedex = (pokemon: Pokemon) => {
    dispatch(addToPokedex(pokemon));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} className="pokemon-list">
          {pokemons.map((pokemon: Pokemon) => (
            <Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={pokemon.image}
                  alt={pokemon.name}
                />
                <CardContent>
                  <Typography variant="h3">{pokemon.name}</Typography>
                  <Typography>ID: {pokemon.id}</Typography>
                  <Typography>Altura: {pokemon.height}</Typography>
                  <Grid sx={{mt:1, mb:1}}>
                    <Button component={Link} to={`/pokemon/${pokemon.name}`} variant="contained" disableElevation>
                      Ver detalhes
                    </Button>
                  </Grid>
                  <Grid>
                    <Button onClick={() => handleAddToPokedex(pokemon)} variant="outlined">
                      Adicionar à Pokédex
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination count={10} page={page} onChange={handlePageChange} style={{ marginTop: '16px' }} />

      <Typography variant="h5" gutterBottom style={{ marginTop: '32px' }}>Pokédex</Typography>
      <Grid container spacing={2}>
        {pokedex.map(pokemon => (
          <Grid key={pokemon.id} size={{ xs: 4, sm: 3, md: 2 }} >
            <Card>
              <CardMedia
                component="img"
                height="80"
                image={pokemon.image}
                alt={pokemon.name}
              />
              <CardContent>
                <Typography variant="subtitle1">{pokemon.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ListPage;
