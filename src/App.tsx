import { Header } from "components/layout/Header";
import { Login } from "components/page-login";
import { Home } from "pages/Home";
import { Route, Routes } from "react-router-dom";

const App = (): JSX.Element => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-book" element={<h1>create book</h1>} />
      <Route path="/update-book/:id" element={<h1>update book</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>404 page</h1>} />
    </Routes>
  </>
);

export default App;
