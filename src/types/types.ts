export interface ThemeContextProps {
  theme: { syntax: string; ui: string; bg: string };
  toggleTheme: () => void;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  toggleAuth: () => void;
}
