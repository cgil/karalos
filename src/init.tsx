import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const HomePage = React.lazy(() => import("./routes/home/home-page"));
const NotFoundPage = React.lazy(() => import("./routes/errors/not-found-page"));

export const Init = (): JSX.Element | null => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<Navigate to="/" />} path="/karalos" />
        <Route element={<NotFoundPage />} path="/404" />
        <Route element={<Navigate to="/404" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};
