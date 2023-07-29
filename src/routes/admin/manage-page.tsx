import { FC, useCallback, useEffect, useState } from "react";
import CommonPage from "../common-page";
import { ref as firebaseRef } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { getFirebaseStorageRef } from "../../utils/firebase-utils/firebase-utils";
import { useDropzone } from "react-dropzone";
import styled, { useTheme } from "styled-components";
import { Container, Stack } from "@mui/system";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import ExifReader from "exifreader";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import { toRem } from "../../utils/styled-components";
import UploadIcon from "@mui/icons-material/CloudUpload";
import { LoadingButton } from "@mui/lab";
import { AdminLayout } from "./components/admin-layout";

type FileType = File & {
  preview: string;
  Latitude: number | undefined;
  Longitude: number | undefined;
};

const DropzoneContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${toRem(20)};
  border-width: ${toRem(2)};
  border-radius: ${toRem(2)};
  border-color: ${(props) => props.theme["palette"].dark};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  height: ${toRem(200)};
`;

const PreviewContainer = styled(Stack)`
  margin-top: ${toRem(24)};
`;

const ManagePage: FC = (): JSX.Element | null => {
  const theme = useTheme();
  const storageRef = getFirebaseStorageRef();
  const [files, setFiles] = useState<FileType[]>([]);
  const [uploadFile, uploading] = useUploadFile();

  const handleUploadAll = useCallback(async () => {
    Promise.allSettled(
      files.map(async (selectedFile) => {
        if (selectedFile) {
          const fileName = selectedFile.name.toLowerCase().replace(/\s+/g, "-");
          const ref = firebaseRef(storageRef, fileName);
          return uploadFile(ref, selectedFile, {
            contentType: `image/${selectedFile.type}`,
            customMetadata: {
              Latitude: selectedFile.Latitude?.toString() ?? "",
              Longitude: selectedFile.Longitude?.toString() ?? "",
            },
          });
        }
      })
    ).then(() => setFiles([]));
  }, [files, storageRef, uploadFile]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      Promise.all(
        acceptedFiles.map(async (file) => {
          const fileTags = await ExifReader.load(file, { expanded: true });
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
            Latitude: fileTags.gps?.Latitude,
            Longitude: fileTags.gps?.Longitude,
          });
        })
      ).then((files) => setFiles(files));
    },
  });

  const removeFile = useCallback(
    (file: FileType) => () => {
      const newFiles = [...files];
      newFiles.splice(newFiles.indexOf(file), 1);
      setFiles(newFiles);
    },
    [files]
  );

  const handleUpdateFileName = useCallback(
    (name: string, fileIndex: number) => {
      let allFiles = [...files];
      const fileToUpdate: FileType = allFiles[fileIndex];
      const fileName = (name.substring(0, name.lastIndexOf(".")) || name)
        .replace(/\s+/g, "-")
        .toLowerCase();

      const fileExtension = fileToUpdate.type.slice(
        fileToUpdate.type.lastIndexOf("/") + 1
      );

      const updatedFile = new File(
        [fileToUpdate],
        `${fileName}.${fileExtension}`,
        {
          type: fileToUpdate.type,
        }
      );

      allFiles[fileIndex] = Object.assign(updatedFile, {
        preview: URL.createObjectURL(updatedFile),
        Latitude: fileToUpdate.Latitude,
        Longitude: fileToUpdate.Longitude,
      });
      setFiles(allFiles);
    },
    [files]
  );

  useEffect(
    () => () => {
      // Revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <CommonPage pageName="Upload">
      <AdminLayout>Inside</AdminLayout>
    </CommonPage>
  );
};

export default ManagePage;
