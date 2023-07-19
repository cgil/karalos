import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  html {
    font-family: "Roboto", '"Helvetica Neue"';
  }

  #webpack-dev-server-client-overlay {
    display: none;
  }
`;

// eslint-disable-next-line import/no-default-export
export default GlobalStyle;
