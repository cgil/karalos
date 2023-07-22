import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const HomePage = React.lazy(() => import("./routes/home/home-page"));
const GalleryPage = React.lazy(() => import("./routes/gallery/gallery-page"));
const NotFoundPage = React.lazy(() => import("./routes/errors/not-found-page"));

export const Init = (): JSX.Element | null => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<GalleryPage />} path="/gallery" />
        <Route element={<NotFoundPage />} path="/404" />
        <Route element={<Navigate to="/404" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};
