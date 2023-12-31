import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
  Container,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Button,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CarouselIcon from "@mui/icons-material/ViewCarousel";
import CollectionsIcon from "@mui/icons-material/Collections";
import React, { ReactNode } from "react";
import { FC } from "react";
import { toRem } from "../utils/styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth/use-auth";

type CommonPageProps = {
  children: ReactNode;
  pageName: string;
};

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme["zIndex"].drawer + 1,
  transition: theme["transitions"].create(["width", "margin"], {
    easing: theme["transitions"].easing.sharp,
    duration: theme["transitions"].duration.leavingScreen,
  }),
  borderBottom: 1,
  ...(open && {
    marginLeft: `${toRem(drawerWidth)}`,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme["transitions"].create(["width", "margin"], {
      easing: theme["transitions"].easing.sharp,
      duration: theme["transitions"].duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop: string) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: `${toRem(drawerWidth)}`,
    transition: theme["transitions"].create("width", {
      easing: theme["transitions"].easing.sharp,
      duration: theme["transitions"].duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme["transitions"].create("width", {
        easing: theme["transitions"].easing.sharp,
        duration: theme["transitions"].duration.leavingScreen,
      }),
      width: theme["spacing"](7),
      [theme["breakpoints"].up("sm")]: {
        width: theme["spacing"](9),
      },
    }),
  },
}));

const CommonPage: FC<CommonPageProps> = (props) => {
  const auth = useAuth();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "white" }}>
      <AppBar elevation={0} position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              backgroundColor: "black",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, color: "black" }}
          >
            {props.pageName}
          </Typography>
          {auth.user ? (
            <Button onClick={auth.logout} color="primary">
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/sign-in" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer elevation={0} variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <React.Fragment>
            <StyledLink to="/">
              <ListItemButton>
                <ListItemIcon>
                  <CarouselIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </StyledLink>
          </React.Fragment>
          <Divider sx={{ my: 1 }} />
          <React.Fragment>
            <StyledLink to="/gallery">
              <ListItemButton>
                <ListItemIcon>
                  <CollectionsIcon />
                </ListItemIcon>
                <ListItemText primary="Gallery" />
              </ListItemButton>
            </StyledLink>
          </React.Fragment>
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {props.children}
        </Container>
      </Box>
    </Box>
  );
};

export default CommonPage;
