import React from "react";
import { FC } from "react";
import { Navigate, Route, Routes } from "react-router";

import { routePaths } from "../route-paths";

const UploadPage = React.lazy(() => import("./upload-page"));
const ManagePage = React.lazy(() => import("./manage-page"));

const AdminPage: FC = () => {
  return (
    <Routes>
      <Route element={<UploadPage />} path={routePaths.adminUpload} />
      <Route element={<ManagePage />} path={routePaths.adminManage} />
      <Route element={<Navigate to={routePaths.adminManage} />} path="/" />
    </Routes>
  );
};

export default AdminPage;
