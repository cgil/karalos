import { FC } from "react";
import CommonPage from "../common-page";
import { getFirebaseStorage } from "../../utils/firebase-utils/firebase-utils";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
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

const useHomePage = () => {
  const firebaseStorage = getFirebaseStorage();
  const [photoList, photoListLoading] = useListItems(firebaseStorage);

  console.log(photoList);

  return { photoList, photoListLoading };
};

const HomePage: FC = (): JSX.Element | null => {
  const controller = useHomePage();
  if (controller.photoListLoading) {
    return null;
  }

  return (
    <CommonPage pageName="Home">
      <Carousel autoPlay stopAutoPlayOnHover interval={5000}>
        {controller.photoList?.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </CommonPage>
  );
};

export default HomePage;
