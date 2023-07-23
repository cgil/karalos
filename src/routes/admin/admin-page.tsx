import { FC, useEffect, useState } from "react";
import CommonPage from "../common-page";
import { ref as firebaseRef } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { getFirebaseStorageRef } from "../../utils/firebase-utils/firebase-utils";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Container, Stack } from "@mui/system";
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

type FileType = File & { preview: string };

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

const AdminPage: FC = (): JSX.Element | null => {
  const storageRef = getFirebaseStorageRef();
  const [files, setFiles] = useState<FileType[]>([]);
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const ref = firebaseRef(storageRef, "file.jpg");

  const handleUploadAll = async () => {
    files.forEach(async (selectedFile) => {
      if (selectedFile) {
        console.log(selectedFile.type);
        const result = await uploadFile(ref, selectedFile, {
          contentType: "image/*",
        });
        console.log(`Result: ${JSON.stringify(result)}`);
      }
    });
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const removeFile = (file: FileType) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <CommonPage pageName="Admin">
      <Container maxWidth="lg">
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
              <Button
                size="medium"
                type="button"
                variant="contained"
                onClick={handleUploadAll}
                color="secondary"
                disabled={!(files.length > 0)}
                startIcon={<UploadIcon />}
              >
                Upload
              </Button>
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
          {files.map((file: FileType) => (
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
                    height: toRem(130),
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
                    <Typography
                      gutterBottom
                      noWrap
                      variant="body1"
                      component="div"
                    >
                      {file.name}
                    </Typography>
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
      </Container>
    </CommonPage>
  );
};

export default AdminPage;
