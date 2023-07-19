import React, { Suspense } from "react";
import { Init } from "./init";
import GlobalStyle from "./components/global-style/GlobalStyle";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import "./App.css";

const renderSuspenseFallback = () => <div />;

export const App = (): JSX.Element => (
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider>
      <Suspense fallback={renderSuspenseFallback()}>
        <Init />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);
