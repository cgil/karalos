import { StorageReference, getStorage, ref } from "firebase/storage";

export const getFirebaseStorage = (url?: string): StorageReference => {
  return ref(getStorage(), url ?? "images");
};
