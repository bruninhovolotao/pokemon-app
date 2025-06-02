import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/Store';
import { fetchPokemonDetails } from '../redux/PokemonSlice';
import { Card, CardMedia, CardContent, Typography, Button, CircularProgress, Grid} from '@mui/material';

const DetailsPage = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { pokemonDetails, loading } = useSelector(
    (state: RootState) => state.pokemon
  );

  useEffect(() => {
    if (name) {
      dispatch(fetchPokemonDetails(name));
    }
  }, [dispatch, name]);

  if (loading || !pokemonDetails) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className='page-details'>
      <Button variant="outlined" onClick={() => navigate('/')}>
        Voltar
      </Button>
      <Card sx={{ marginTop: 2 }}>
        <CardMedia
          component="img"
          height="250"
          image={pokemonDetails.image}
          alt={pokemonDetails.name}
          sx={{ objectFit: 'contain', backgroundColor: '#f2f2f2' }}
        />
        <CardContent>
          <Typography variant="h2" gutterBottom>
            {pokemonDetails.name}
          </Typography>
          <Typography>ID: {pokemonDetails.id}</Typography>
          <Typography>Altura: {pokemonDetails.height}</Typography>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Habilidades:
          </Typography>
          <Grid container spacing={1}>
            {pokemonDetails.abilities.map((ability) => (
              <Grid key={ability}>
                <Typography>{ability}</Typography>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Stats:
          </Typography>
          <Grid container spacing={1}>
            {pokemonDetails.stats.map((stat) => (
              <Grid key={stat.name}>
                <Typography>
                  {stat.name}: {stat.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsPage;
