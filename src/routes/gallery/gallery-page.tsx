import { FC } from "react";
import CommonPage from "../common-page";
import { getFirebaseStorage } from "../../utils/firebase-utils/firebase-utils";
import Carousel from "react-material-ui-carousel";
import { Box, ImageList, ImageListItem, Paper } from "@mui/material";
import useListItems from "../../utils/firebase-utils/use-list-items";
import Image from "mui-image";
import styled from "styled-components";

type CarouselItem = {
  url: string;
};

const StyledItem = styled(Paper)`
  width: 100%;
  height: 80vh;
`;

const Item = ({ item }: { item: CarouselItem }) => {
  return (
    <StyledItem>
      <Image
        src={item.url}
        alt=""
        showLoading
        style={{ objectFit: "contain" }}
      />
    </StyledItem>
  );
};

const useGalleryPage = () => {
  const firebaseStorage = getFirebaseStorage();
  const [photoList, photoListLoading] = useListItems(firebaseStorage);

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
        <ImageList variant="masonry" cols={3} gap={8}>
          {(controller.photoList ?? []).map((item) => (
            <ImageListItem key={item.url}>
              <img
                src={`${item.url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={""}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </CommonPage>
  );
};

export default GalleryPage;
