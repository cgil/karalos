import {
  getDownloadURL,
  list,
  StorageError,
  StorageReference,
} from "firebase/storage";
import { useEffect, useRef } from "react";
import useLoadingValue from "./use-loading-value";

export type ListItem = {
  url: string;
};
export type LoadingHook<T, E> = [T | undefined, boolean, E | undefined];
export type ListItemsHook = LoadingHook<ListItem[], StorageError>;

export type RefHook<T> = {
  current: T;
};

export const useComparatorRef = <T>(
  value: T | null | undefined,
  isEqual: (v1: T | null | undefined, v2: T | null | undefined) => boolean,
  onChange?: () => void
): RefHook<T | null | undefined> => {
  const ref = useRef(value);
  useEffect(() => {
    if (!isEqual(value, ref.current)) {
      ref.current = value;
      if (onChange) {
        onChange();
      }
    }
  });
  return ref;
};

const isEqual = (
  v1: StorageReference | null | undefined,
  v2: StorageReference | null | undefined
): boolean => {
  const bothNull: boolean = !v1 && !v2;
  const equal: boolean = !!v1 && !!v2 && v1.fullPath === v2.fullPath;
  return bothNull || equal;
};

const useListItems = (storageRef?: StorageReference | null): ListItemsHook => {
  const { error, loading, reset, setError, setValue, value } = useLoadingValue<
    ListItem[],
    StorageError
  >();
  const ref = useComparatorRef(storageRef, isEqual, reset);

  useEffect(() => {
    if (!ref.current) {
      setValue(undefined);
      return;
    }
    list(ref.current)
      .then((listResult) =>
        Promise.all(listResult.items.map((item) => getDownloadURL(item)))
      )
      .then((urls) => {
        setValue(
          urls.map((url) => ({
            url,
          }))
        );
      })
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return [value, loading, error];
};

export default useListItems;
