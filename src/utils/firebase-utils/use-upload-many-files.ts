import {
  StorageReference,
  ref as firebaseRef,
  UploadResult,
  getMetadata,
} from "firebase/storage";
import { useCallback, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";

export type UseUploadManyFiles = {
  uploadManyFiles: ({
    storageRef,
    files,
  }: {
    storageRef: StorageReference;
    files: FileType[];
  }) => Promise<(UploadResult | undefined)[]>;
  createFolder: ({
    storageRef,
    folderName,
  }: {
    storageRef: StorageReference;
    folderName: string;
  }) => Promise<UploadResult | undefined>;
  uploading: boolean;
};

export type FileType = File & {
  preview: string;
  Latitude: number | undefined;
  Longitude: number | undefined;
};

export const useUploadManyFiles = (): UseUploadManyFiles => {
  const [doneUploading, setDoneUploading] = useState<boolean>(true);
  const [uploadFile, uploading] = useUploadFile();

  const createFolder = useCallback(
    async ({
      storageRef,
      folderName,
    }: {
      storageRef: StorageReference;
      folderName: string;
    }): Promise<UploadResult | undefined> => {
      setDoneUploading(false);
      const file: FileType = Object.assign(
        new File([], `${folderName}/temp.jpeg`),
        {
          preview: "",
          Latitude: undefined,
          Longitude: undefined,
        }
      );

      const ref = firebaseRef(storageRef, `${folderName}/temp.jpeg`);

      return uploadFile(ref, file, {
        contentType: "image/jpeg",
      }).then(async (result) => {
        setDoneUploading(true);
        if (!result) return undefined;

        const parentRef = result?.ref.parent
          ? firebaseRef(result.ref.parent)
          : undefined;

        if (!parentRef) return undefined;

        // Getting the folder metadata is not supported by firebase/storage, but we don't need it anyway
        // this is to make types pass
        const fakeParentMetadata = await getMetadata(result.ref);

        // TODO: Delete the temp file we just created

        return { ref: parentRef, metadata: fakeParentMetadata };
      });
    },
    [uploadFile]
  );

  const uploadManyFiles = useCallback(
    async ({
      storageRef,
      files,
    }: {
      storageRef: StorageReference;
      files: FileType[];
    }): Promise<(UploadResult | undefined)[]> => {
      setDoneUploading(false);
      return Promise.all(
        files.map(async (selectedFile) => {
          if (selectedFile) {
            const fileName = selectedFile.name
              .toLowerCase()
              .replace(/\s+/g, "-");
            const ref = firebaseRef(storageRef, fileName);
            const contentType = `image/${selectedFile.type}`;
            return uploadFile(ref, selectedFile, {
              contentType: contentType,
              customMetadata: {
                Latitude: selectedFile.Latitude?.toString() ?? "",
                Longitude: selectedFile.Longitude?.toString() ?? "",
              },
            });
          }
        })
      ).then((result) => {
        setDoneUploading(true);
        return result;
      });
    },
    [uploadFile]
  );

  return {
    uploadManyFiles,
    createFolder,
    uploading: !doneUploading || uploading,
  };
};
