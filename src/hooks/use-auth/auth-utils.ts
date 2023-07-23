import { getAuth, User } from "firebase/auth";

import {
  waitForUser,
  signOut as firebaseSignOut,
} from "../../utils/firebase-utils/firebase-utils";
import type { ApiUser } from "./types";

export const authExisting = async (): Promise<ApiUser> => {
  const firebaseUser = await waitForUser();

  if (!firebaseUser) throw new Error("No existing user");

  return {
    email: firebaseUser.email,
    name: firebaseUser.displayName ?? "Person",
    photoUrl: firebaseUser.photoURL,
  };
};

export const ensureAuthed = (): User => {
  const { currentUser } = getAuth();

  if (!currentUser) {
    throw new Error("No existing user");
  }

  return currentUser;
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut();
};
