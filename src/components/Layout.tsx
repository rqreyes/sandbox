import { Container, Paper } from "@mui/material";

export const Layout: React.FC = ({ children }): JSX.Element => (
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
