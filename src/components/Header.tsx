import { Mail, MoveToInbox } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navList = [
  { label: "Nav Item 1", value: "/" },
  { label: "Nav Item 2", value: "/route-2" },
  { label: "Nav Item 3", value: "/route-3" },
];

const StyledNavLink = styled(NavLink)(() => ({
  textDecoration: "none",

  "&.active": {
    color: "orange",
  },
}));

export const Header = (): JSX.Element => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const theme = useTheme();
  const isScreenSm = useMediaQuery(theme.breakpoints.down("md"));
  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          {isScreenSm && (
            <IconButton edge="start" onClick={handleOpenDrawer} size="large">
              <MenuIcon />
            </IconButton>
          )}

          <NavLink style={{ flexGrow: 1 }} to="/">
            <Typography variant="h1">React Query</Typography>
          </NavLink>

          {!isScreenSm &&
            navList.map(({ label, value }) => (
              <StyledNavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={value}
              >
                <Button color="inherit">{label}</Button>
              </StyledNavLink>
            ))}
          <StyledNavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/login"
          >
            <Button color="inherit">Log In</Button>
          </StyledNavLink>
        </Toolbar>
      </AppBar>
      <Drawer onClose={handleCloseDrawer} open={isOpenDrawer}>
        <List sx={{ width: 250 }}>
          {React.Children.toArray(
            navList.map(({ label, value }, index, array) => {
              const lastItem = index === array.length - 1;

              return (
                <>
                  <StyledNavLink to={value}>
                    <ListItem button>
                      <ListItemIcon>
                        {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                      </ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItem>
                  </StyledNavLink>
                  {!lastItem && <Divider />}
                </>
              );
            })
          )}
        </List>
      </Drawer>
    </>
  );
};
