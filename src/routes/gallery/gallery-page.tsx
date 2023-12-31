import { FC } from "react";
import CommonPage from "../common-page";
import { getFirebaseStorageRef } from "../../utils/firebase-utils/firebase-utils";
import { Box, ImageList, ImageListItem } from "@mui/material";
import useListItems from "../../utils/firebase-utils/use-list-items";
import styled from "styled-components";
import { toRem } from "../../utils/styled-components";

const StyledImageListItem = styled(ImageListItem)`
  & .MuiImageListItem-img {
    border-radius: ${toRem(10)};
  }
`;

const useGalleryPage = () => {
  const firebaseStorage = getFirebaseStorageRef();
  const { data: photoList, loading: photoListLoading } = useListItems({
    storageRef: firebaseStorage,
    fetchFiles: true,
  });

  return { photoList, photoListLoading };
};

const GalleryPage: FC = (): JSX.Element | null => {
  const controller = useGalleryPage();
  if (controller.photoListLoading) {
    return null;
  }

  return (
    <CommonPage pageName="Gallery">
      <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
        <ImageList variant="masonry" cols={3} gap={12}>
          {(controller.photoList?.files ?? []).map((file) => (
            <StyledImageListItem key={file.url}>
              <img
                src={`${file.url}?w=248&fit=crop&auto=format`}
                srcSet={`${file.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={""}
                loading="lazy"
              />
            </StyledImageListItem>
          ))}
        </ImageList>
      </Box>
    </CommonPage>
  );
};

export default GalleryPage;
