import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)(() => ({
  "&.active": {
    color: "red"
  }
}));

export const Header = () => (
  <AppBar>
    <Toolbar>
      <IconButton edge="start" size="large">
        <MenuIcon />
      </IconButton>
      <NavLink style={{ flexGrow: 1 }} to="/">
        <Typography variant="h1">React Query</Typography>
      </NavLink>
      <StyledNavLink className={({ isActive }) => (isActive ? "active" : "")} to="/create-book">
        <Button color="inherit">Create Book</Button>
      </StyledNavLink>
      <StyledNavLink className={({ isActive }) => (isActive ? "active" : "")} to="/login">
        <Button color="inherit">Log In</Button>
      </StyledNavLink>
    </Toolbar>
  </AppBar>
);
