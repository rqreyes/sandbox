import { Mail, MoveToInbox } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navList = [
  { label: "Blank", link: "/blank" },
  { label: "Easter Egg", link: "/easter-egg" },
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
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Box>
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
            </Box>
            <Box>
              {!isScreenSm &&
                React.Children.toArray(
                  navList.map(({ label, link }) => (
                    <StyledNavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      to={link}
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
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer onClose={handleCloseDrawer} open={isOpenDrawer}>
        <List sx={{ width: 250 }}>
          {React.Children.toArray(
            navList.map(({ label, link }, index, array) => {
              const lastItem = index === array.length - 1;

              return (
                <>
                  <StyledNavLink to={link}>
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
