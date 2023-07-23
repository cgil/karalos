import React, { Suspense } from "react";
import { Init } from "./init";
import GlobalStyle from "./components/global-style/GlobalStyle";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import "./App.css";
import { init as initFirebase } from "./utils/firebase-utils/firebase-init";
import { AuthProvider } from "./hooks/use-auth/use-auth";

const renderSuspenseFallback = () => <div />;

initFirebase();

export const App = (): JSX.Element => (
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={renderSuspenseFallback()}>
          <Init />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
