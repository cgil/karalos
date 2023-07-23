import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./routes/private-route/private-route";
import { routePaths } from "./routes/route-paths";

const HomePage = React.lazy(() => import("./routes/home/home-page"));
const GalleryPage = React.lazy(() => import("./routes/gallery/gallery-page"));
const SignInPage = React.lazy(() => import("./routes/sign-in/sign-in-page"));
const AdminPage = React.lazy(() => import("./routes/admin/admin-page"));
const NotFoundPage = React.lazy(() => import("./routes/errors/not-found-page"));

export const Init = (): JSX.Element | null => {
  return (
    <BrowserRouter basename={routePaths.basename}>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<GalleryPage />} path="/gallery" />
        <Route element={<SignInPage />} path="/sign-in" />
        <Route
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
          path="/admin"
        />
        <Route element={<NotFoundPage />} path="/404" />
        <Route element={<Navigate to="/404" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};
