import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { ThemeContextProps } from "../types/types";

export const BookList = (): JSX.Element => {
  const { theme } = useContext(ThemeContext) as ThemeContextProps;

  return (
    <div
      className="book-list"
      style={{ background: theme.bg, color: theme.syntax }}
    >
      <ul>
        <li style={{ background: theme.ui }}>the way of kings</li>
        <li style={{ background: theme.ui }}>the name of the wind</li>
        <li style={{ background: theme.ui }}>the final empire</li>
      </ul>
    </div>
  );
};
