import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getFullPath } from "../../routes/route-paths";
import { createTypedContext } from "../../utils/create-typed-context";
import { authExisting, ensureAuthed, signOut } from "./auth-utils";
import type { ApiUser } from "./types";

type AuthProviderProps = {
  children: React.ReactNode;
};

enum AuthErrorMessage {
  NoMessage = "",
  NotAuthorized = "Unable to log in. Try again or contact your admin (aka... Carlos)",
  SessionExpired = "Your session expired, please log in again",
}

type AuthContextProps = {
  user: ApiUser | undefined;
  loading: boolean;
  authErrorMessage: string;
  logout: () => void;
  authCheck: () => Promise<boolean>;
  setUser: React.Dispatch<React.SetStateAction<ApiUser | undefined>>;
};

const [useAuthInternal, AuthContextProvider] =
  createTypedContext<AuthContextProps>();

export const useAuth = useAuthInternal;

export const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<AuthContextProps["user"]>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [authErrorMessage, setAuthErrorMessage] = useState<
    AuthContextProps["authErrorMessage"]
  >(AuthErrorMessage.NoMessage);

  const logout = useCallback(async () => {
    await signOut();
    setUser(undefined);
    setLoading(false);
  }, []);

  const authCheck = useCallback(async (): Promise<boolean> => {
    try {
      await ensureAuthed();
      setAuthErrorMessage(AuthErrorMessage.NoMessage);
      return true;
    } catch {
      setAuthErrorMessage(AuthErrorMessage.SessionExpired);
      setUser(undefined);
    }
    return false;
  }, []);

  // Runs once when the component first mounts
  useEffect(() => {
    const checkUserAuth = async () => {
      setAuthErrorMessage(AuthErrorMessage.NoMessage);
      const activeUser = await authExisting();
      if (activeUser) {
        setUser(activeUser);
      } else {
        setUser(undefined);
      }
      setLoading(false);
    };

    // Disable initial auth check on sign-in page, so the user can sign in with a different account
    if (window.location.pathname.startsWith(getFullPath("/sign-in"))) {
      setLoading(false);
      return;
    }

    checkUserAuth().catch(() => {
      setAuthErrorMessage(AuthErrorMessage.NotAuthorized);
      setUser(undefined);
      setLoading(false);
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      authErrorMessage,
      logout,
      authCheck,
      setUser,
    }),
    [user, loading, authErrorMessage, logout, authCheck]
  );

  return (
    <AuthContextProvider value={value}>{props.children}</AuthContextProvider>
  );
};
