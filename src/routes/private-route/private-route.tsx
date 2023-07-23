import React, { useEffect, useMemo } from "react";

import { Location } from "react-router";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

import { routePaths } from ".././route-paths";
import { useAuth } from "../../hooks/use-auth/use-auth";

type PrivateRouteProps = {
  children: React.ReactElement | null;
};

const getRelativeUrl = ({ hash, pathname, search }: Location): string =>
  pathname + search + hash;

export const PrivateRoute = (
  props: PrivateRouteProps
): React.ReactElement | null => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const isAdminRoute = useMatch(routePaths.admin);

  useEffect(() => {
    const redirectToSignIn = () => {
      const nextUrl = getRelativeUrl(location);
      navigate(routePaths.signIn, { state: { nextUrl } });
    };
    auth
      .authCheck()
      .then((isAuthed) => {
        if (!isAuthed) {
          redirectToSignIn();
        }
        return isAuthed;
      })
      .catch(redirectToSignIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const nextUrl = getRelativeUrl(location);
    if (!auth.user) {
      navigate(routePaths.signIn, { state: { nextUrl } });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const shouldRender = useMemo(() => isAdminRoute, [isAdminRoute]);

  if (!shouldRender) return null;

  return props.children;
};
