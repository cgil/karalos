import { Box, Container, Paper, Tab, Tabs } from "@mui/material";
import { FC } from "react";
import { useMatch } from "react-router";
import { Link } from "react-router-dom";
import { toRem } from "../../../utils/styled-components";

import { routePaths } from "../../route-paths";

type AdminLayoutProps = { children?: React.ReactNode };

const LinkTab = (props: { value: string; label: string }) => (
  <Tab {...props} component={Link} to={`../${props.value}`} />
);

export const AdminLayout: FC<AdminLayoutProps> = (props) => {
  const match = useMatch(routePaths.admin);
  const tabValue = match?.params["*"];

  return (
    <Container maxWidth={false} disableGutters>
      <Paper
        elevation={1}
        sx={{
          bgcolor: (theme) => `${theme.palette.background.default} !important`,
        }}
      >
        <Tabs sx={{ px: toRem(24), pt: toRem(12) }} value={tabValue}>
          <LinkTab label="Upload" value={routePaths.adminUpload} />
          <LinkTab label="Manage" value={routePaths.adminManage} />
        </Tabs>
        <Box p={4}>{props.children}</Box>
      </Paper>
    </Container>
  );
};
