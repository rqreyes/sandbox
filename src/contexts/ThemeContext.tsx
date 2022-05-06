import { createContext, useState } from "react";
import { ThemeContextProps } from "../types/types";

export interface ThemeContextProviderProps {
  children: React.ReactNode;
}

const light = {
  syntax: "#555",
  ui: "#ddd",
  bg: "#eee",
};
const dark = {
  syntax: "#ddd",
  ui: "#333",
  bg: "#555",
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps): JSX.Element => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = () => {
    setIsLightTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: isLightTheme ? light : dark, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
