import { Container, Paper } from "@mui/material";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Container>
    <Paper
      sx={{
        p: 5,
      }}
    >
      {children}
    </Paper>
  </Container>
);
