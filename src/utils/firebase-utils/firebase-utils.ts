import { StorageReference, getStorage, ref } from "firebase/storage";

import { getAuth, User } from "firebase/auth";

export const getFirebaseStorageRef = (url?: string): StorageReference => {
  return ref(getStorage(), url ?? "images");
};

export const waitForUser = (): Promise<User | undefined> =>
  new Promise((resolve) => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      unsubscribe();

      resolve(user || undefined);
    });
  });

export const signOut = async (): Promise<void> => await getAuth().signOut();
