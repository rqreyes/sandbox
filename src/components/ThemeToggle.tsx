import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { ThemeContextProps } from "../types/types";

export const ThemeToggle = (): JSX.Element => {
  const { toggleTheme } = useContext(ThemeContext) as ThemeContextProps;

  return (
    <button type="button" onClick={toggleTheme}>
      Toggle the theme
    </button>
  );
};
