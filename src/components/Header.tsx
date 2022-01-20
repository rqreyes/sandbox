import { Mail, MoveToInbox } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navList = [
  { label: "Blank", value: "/blank" },
  { label: "Easter Egg", value: "/easter-egg" },
];

const StyledNavLink = styled(NavLink)(() => ({
  color: "maroon",
  textDecoration: "none",

  "&:hover, &.active": {
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
          <Grid container justifyContent="space-between">
            <Grid item>
              {isScreenSm && (
                <IconButton
                  edge="start"
                  onClick={handleOpenDrawer}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              )}
              <StyledNavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/"
              >
                <Button color="inherit">React Query</Button>
              </StyledNavLink>
            </Grid>
            <Grid item>
              {!isScreenSm &&
                React.Children.toArray(
                  navList.map(({ label, value }) => (
                    <StyledNavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      to={value}
                    >
                      <Button color="inherit">{label}</Button>
                    </StyledNavLink>
                  ))
                )}
              <StyledNavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/login"
              >
                <Button color="inherit">Log In</Button>
              </StyledNavLink>
            </Grid>
          </Grid>
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
