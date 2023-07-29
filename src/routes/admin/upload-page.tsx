import { FC, useCallback, useEffect, useState } from "react";
import CommonPage from "../common-page";
import { ref as firebaseRef } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { getFirebaseStorageRef } from "../../utils/firebase-utils/firebase-utils";
import { useDropzone } from "react-dropzone";
import styled, { useTheme } from "styled-components";
import { Stack } from "@mui/system";
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

const UploadPage: FC = (): JSX.Element | null => {
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
      <AdminLayout>
        <Stack
          direction="row"
          justifyContent="end"
          useFlexGap
          sx={{ marginBottom: toRem(12) }}
        >
          <Tooltip
            title={files.length > 0 ? null : "No files added to Upload."}
          >
            <span>
              <LoadingButton
                size="medium"
                type="button"
                variant="contained"
                onClick={handleUploadAll}
                color="secondary"
                disabled={!(files.length > 0)}
                startIcon={<UploadIcon />}
                loading={uploading}
                loadingPosition="start"
              >
                Upload
              </LoadingButton>
            </span>
          </Tooltip>
        </Stack>
        <DropzoneContainer>
          <div
            {...getRootProps({ className: "dropzone" })}
            onClick={(e) => e.stopPropagation}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select images</p>
            <Stack direction="row" justifyContent="center" useFlexGap>
              <Button
                size="medium"
                type="button"
                variant="contained"
                onClick={open}
              >
                Add
              </Button>
            </Stack>
          </div>
        </DropzoneContainer>
        <PreviewContainer
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="flex-start"
          spacing={2}
          useFlexGap
        >
          {files.map((file: FileType, fileIndex: number) => (
            <Card sx={{ maxWidth: 280, display: "flex" }} key={file.name}>
              <Box
                sx={{
                  display: "flex",
                  width: toRem(130),
                  justifyContent: "flex-start",
                }}
              >
                <CardMedia
                  component="img"
                  image={file.preview}
                  alt={file.name}
                  sx={{
                    width: "auto",
                    maxWidth: toRem(130),
                    height: toRem(133),
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: toRem(150),
                }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography noWrap variant="body2" color="text.secondary">
                    Pending upload
                  </Typography>
                  <Tooltip title={file.name}>
                    <Stack direction="row">
                      <span style={{ width: `calc(100% - ${30}px)` }}>
                        <EditText
                          defaultValue={file.name.slice(
                            0,
                            file.name.lastIndexOf(".")
                          )}
                          onSave={(data) =>
                            handleUpdateFileName(data.value, fileIndex)
                          }
                          placeholder="Image name"
                          style={{
                            border: `${toRem(1)} solid #ffff`,
                            paddingLeft: 0,
                            fontSize: theme["typography"].body1.fontSize,
                          }}
                        />
                      </span>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        style={{ width: toRem(30), lineHeight: toRem(34) }}
                      >
                        .{file.type.slice(file.type.lastIndexOf("/") + 1)}
                      </Typography>
                    </Stack>
                  </Tooltip>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={removeFile(file)}
                  >
                    Remove Image
                  </Button>
                </CardActions>
              </Box>
            </Card>
          ))}
        </PreviewContainer>
      </AdminLayout>
    </CommonPage>
  );
};

export default UploadPage;
