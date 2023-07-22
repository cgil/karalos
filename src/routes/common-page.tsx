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
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React, { ReactNode } from "react";
import { FC } from "react";
import { toRem } from "../utils/styled-components";
import { Link } from "react-router-dom";

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

// eslint-disable-next-line max-lines-per-function
const CommonPage: FC<CommonPageProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
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
