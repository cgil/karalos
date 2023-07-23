import React, { useEffect, FC, useState, useRef } from "react";

import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import "firebaseui/dist/firebaseui.css";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { toRem } from "../../utils/styled-components";

import { useAuth } from "../../hooks/use-auth/use-auth";
import { Divider } from "@mui/material";
import { getFullPath } from "../route-paths";

type RouteState =
  | {
      nextUrl?: string;
    }
  | undefined;

const ActionText = styled.span`
  color: ${(props) => props.theme["palette"].text.secondary};
`;

const ActionLink = styled.a`
  color: ${(props) => props.theme["palette"].primary.main};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HelpWrapper = styled.div`
  margin-bottom: ${toRem(24)};
  margin-top: ${toRem(24)};
  text-align: center;
`;

const AuthErrorMessageLine = styled.span`
  color: ${(props) => props.theme["palette"].error.main};
  font-size: ${toRem(12)};
`;

const AuthErrorMessageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: ${toRem(24)};
`;

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: ${toRem(420)};
  padding: ${toRem(24)} ${toRem(12)};
  width: 100%;

  background-color: ${(props) => props.theme["palette"].background.default};
  border: 1px solid ${(props) => props.theme["palette"].divider};
  border-radius: ${toRem(4)};
`;

const IllustratedBanner = styled.div<{ $bgImageUrl: string }>`
  align-items: center;
  background-image: ${(props) => props.$bgImageUrl};
  background-position-x: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  min-height: ${toRem(100)};
  width: 100%;

  margin-bottom: ${toRem(50)};
  margin-top: ${toRem(50)};
`;

const PageCenteredContent = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme["palette"].background.paper};
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: ${toRem(12)};
  width: 100%;
`;

interface Props {
  // The Firebase UI Web UI Config object.
  // See: https://github.com/firebase/firebaseui-web#configuration
  uiConfig: firebaseui.auth.Config;
  // Callback that will be passed the FirebaseUi instance before it is
  // started. This allows access to certain configuration options such as
  // disableAutoSignIn().
  uiCallback?(ui: firebaseui.auth.AuthUI): void;
  // The Firebase App auth instance to use.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firebaseAuth: any; // As firebaseui-web
  className?: string;
}

// FIXME: We're overriding the default StyledFirebaseAuth from react-firebaseui due
// to a bug with React 18. Should be fixed with: https://github.com/firebase/firebaseui-web-react/pull/173
// At which point we can remove our implementation below.
// eslint-disable-next-line react/destructuring-assignment
const StyledFirebaseAuth = ({
  uiConfig,
  firebaseAuth,
  className,
  uiCallback,
}: Props) => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Get or Create a firebaseUI instance.
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebaseAuth);
    if (uiConfig.signInFlow === "popup") firebaseUiWidget.reset();

    // We track the auth state to reset firebaseUi if the user signs out.
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && userSignedIn) firebaseUiWidget.reset();
      setUserSignedIn(!!user);
    });

    // Trigger the callback if any was set.
    if (uiCallback) uiCallback(firebaseUiWidget);

    // Render the firebaseUi Widget.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    firebaseUiWidget.start(elementRef.current, uiConfig);

    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseui, uiConfig]);

  return <div className={className} ref={elementRef} />;
};

const useSignInPage = () => {
  const auth = useAuth();

  const firebaseUIConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    signInSuccessUrl: getFullPath("/admin"),
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  };

  return {
    auth,
    firebaseUIConfig,
  };
};

const SignInPage: FC = () => {
  const controller = useSignInPage();
  const navigate = useNavigate();
  const state = useLocation().state as RouteState;

  useEffect(() => {
    if (!controller.auth?.user) return;

    navigate("/admin", {
      state: {
        nextUrl: state?.nextUrl,
      },
    });
  }, [controller.auth?.user, navigate, state?.nextUrl]);

  return (
    <PageCenteredContent>
      <StyledContainer>
        <IllustratedBanner $bgImageUrl='url("https://firebasestorage.googleapis.com/v0/b/karalos.appspot.com/o/assets%2Fkc-logo.png?alt=media")' />
        <StyledFirebaseAuth
          firebaseAuth={getAuth()}
          uiConfig={controller.firebaseUIConfig}
        />
        <Divider />
        <HelpWrapper>
          <ActionText>Don’t have an account? &nbsp;</ActionText>
          <ActionLink href="https://youtu.be/dQw4w9WgXcQ?si=6Ed1U6vKJqDx4SW1&t=19">
            Request Access
          </ActionLink>
        </HelpWrapper>

        {controller.auth.authErrorMessage && (
          <AuthErrorMessageContainer>
            <AuthErrorMessageLine>
              {controller.auth.authErrorMessage}
            </AuthErrorMessageLine>
          </AuthErrorMessageContainer>
        )}
      </StyledContainer>
    </PageCenteredContent>
  );
};

export default SignInPage;
