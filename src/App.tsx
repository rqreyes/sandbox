import { Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/layout/Header';
import { Welcome } from './pages/Welcome';

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Welcome />}>
        <Route
          path="new-user"
          element={<Typography variant="body1">herro!</Typography>}
        />
      </Route>
      <Route path="/create-book" element={<h1>create book</h1>} />
      <Route path="/update-book/:id" element={<h1>update book</h1>} />
      <Route path="/login" element={<h1>login</h1>} />
      <Route path="*" element={<h1>404 page</h1>} />
    </Routes>
  </>
);

export default App;
