import {
  getDownloadURL,
  listAll,
  StorageError,
  StorageReference,
} from "firebase/storage";
import { useEffect, useRef } from "react";
import { RequireAtLeastOne } from "../type-utils";
import useLoadingValue from "./use-loading-value";

type UseListItemsProps = RequireAtLeastOne<
  {
    storageRef?: StorageReference | null;
    fetchFiles?: boolean;
    fetchFolders?: boolean;
  },
  "fetchFiles" | "fetchFolders"
>;

export type FileItem = {
  name: string;
  path: string;
  url: string;
};
export type FolderItem = {
  name: string;
  path: string;
};
export type ListItems = {
  files?: FileItem[];
  folders?: FolderItem[];
};

export type LoadingHook<T, E> = {
  data: T | undefined;
  loading: boolean;
  error: E | undefined;
};
export type ListItemsHook = LoadingHook<ListItems, StorageError>;

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

const useListItems = (props: UseListItemsProps): ListItemsHook => {
  const { error, loading, reset, setError, setValue, value } = useLoadingValue<
    ListItems,
    StorageError
  >();
  const ref = useComparatorRef(props.storageRef, isEqual, reset);

  useEffect(() => {
    if (!ref.current) {
      setValue(undefined);
      return;
    }
    listAll(ref.current)
      .then((listResult) => {
        return Promise.all([
          props.fetchFiles
            ? Promise.all(
                listResult.items.map((item) => getDownloadURL(item))
              ).then((urls) =>
                urls.map((url, i) => ({
                  url: url,
                  path: listResult.items[i].fullPath,
                  name: listResult.items[i].name,
                }))
              )
            : undefined,
          props.fetchFolders
            ? listResult.prefixes.map((prefix) => ({
                name: prefix.name,
                path: prefix.fullPath,
              }))
            : undefined,
        ]);
      })
      .then(([files, folders]) => {
        setValue({
          files: files,
          folders: folders,
        });
      })
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return { data: value, loading, error };
};

export default useListItems;
