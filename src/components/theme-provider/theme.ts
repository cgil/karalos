import { createTheme } from "@mui/material/styles";
import { DefaultTheme } from "styled-components";

import { toRem } from "../../utils/styled-components";

export const theme: DefaultTheme = createTheme({
  components: {
    MuiPaper: {
      defaultProps: {
        style: { background: "#FFFFFF" },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#3f5372",
        },
      },
    },
    MuiList: {
      defaultProps: {
        style: { background: "#FFFFFF" },
      },
    },
  },
  zIndex: {
    modal: 2000,
    tooltip: 3000,
  },
  palette: {
    primary: {
      light: "#9ca3af",
      main: "#374151",
      dark: "#111827",
    },
    secondary: {
      light: "#c7d2fe",
      main: "#2563eb",
      dark: "#4338ca",
    },
    error: {
      light: "#FFEAEC",
      main: "#D81818",
      dark: "#BD0000",
    },
    warning: {
      light: "#FEF2E0",
      main: "#F79401",
      dark: "#E66900",
    },
    info: {
      main: "#3F5372",
    },
    success: {
      light: "#E4F8ED",
      main: "#0ACF83",
      dark: "#009147",
    },
    text: {
      primary: "#0F1D30",
      secondary: "#8E8E92",
      disabled: "#CCCCCC",
    },
    divider: "#EBE7E6",
    background: {
      default: "#FFFFFF",
      paper: "#F8F9FA",
    },
  },
  spacing: (factor: number) => toRem(factor * 6),
  typography: {
    fontFamily: [
      "Roboto",
      '"Helvetica Neue"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "2.25rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: "1.25rem",
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: "bold",
    },
    caption: {
      fontSize: "0.75rem",
    },
    overline: {
      fontSize: "0.75rem",
    },
  },
  shape: {
    borderRadius: 3,
  },
});
