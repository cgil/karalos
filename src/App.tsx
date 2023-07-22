import React, { Suspense } from "react";
import { Init } from "./init";
import GlobalStyle from "./components/global-style/GlobalStyle";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import "./App.css";
import { init as initFirebase } from "./utils/firebase-utils/firebase-init";

const renderSuspenseFallback = () => <div />;

initFirebase();

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
