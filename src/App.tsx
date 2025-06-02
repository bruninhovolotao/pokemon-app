import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from './pages/ListPage';
import DetailsPage from "./pages/DetailsPage";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import '../src/App.css'

function App() {
  return (
    <Router>
      <AppBar position="fixed" className="header">
        <Toolbar>
          <Typography variant="h1">Pokédex</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{mt:16}}>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/pokemon/:name" element={<DetailsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

