import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContextProps, ThemeContextProps } from "../types/types";

export const NavBar = (): JSX.Element => {
  const { theme } = useContext(ThemeContext) as ThemeContextProps;
  const { isAuthenticated, toggleAuth } = useContext(
    AuthContext
  ) as AuthContextProps;

  return (
    <nav style={{ background: theme.ui, color: theme.syntax }}>
      <h1>Context App</h1>
      <button type="button" onClick={toggleAuth}>
        {isAuthenticated ? "Logged in" : "Logged out"}
      </button>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};
