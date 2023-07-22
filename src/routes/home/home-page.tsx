import { FC } from "react";
import CommonPage from "../common-page";
import { getFirebaseStorage } from "../../utils/firebase-utils/firebase-utils";
import Carousel from "react-material-ui-carousel";
import { Paper, Stack } from "@mui/material";
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

const SpotlightItem = ({
  item,
  itemLeft,
  itemRight,
}: {
  item: CarouselItem;
  itemLeft: CarouselItem | undefined;
  itemRight: CarouselItem | undefined;
}) => {
  return (
    <StyledItem>
      <Stack
        direction="row"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image
          src={itemLeft?.url ?? "#"}
          alt=""
          bgColor="#808080"
          style={{
            objectFit: "cover",
            filter: "grayscale(100%)",
          }}
          wrapperStyle={{ width: "13%" }}
          duration={1}
        />
        <Image
          src={item.url}
          alt=""
          showLoading
          style={{ objectFit: "contain" }}
          wrapperStyle={{ height: "100%", width: "maxContent" }}
          duration={1000}
        />
        <Image
          src={itemRight?.url ?? "#"}
          alt=""
          bgColor="#808080"
          style={{
            objectFit: "cover",
            filter: "grayscale(100%)",
          }}
          wrapperStyle={{
            width: "13%",
            justifyContent: "center",
          }}
          duration={1}
        />
      </Stack>
    </StyledItem>
  );
};

const useHomePage = () => {
  const firebaseStorage = getFirebaseStorage();
  const [photoList, photoListLoading] = useListItems(firebaseStorage);

  return { photoList, photoListLoading };
};

const HomePage: FC = (): JSX.Element | null => {
  const controller = useHomePage();
  if (controller.photoListLoading) {
    return null;
  }

  return (
    <CommonPage pageName="Home">
      <Carousel
        autoPlay
        stopAutoPlayOnHover
        interval={10000}
        animation="fade"
        duration={1000}
      >
        {controller.photoList &&
          controller.photoList.length > 0 &&
          controller.photoList.map((item, i) => {
            const listLength = controller.photoList?.length || 0;
            return (
              <SpotlightItem
                key={i}
                item={item}
                itemLeft={
                  controller.photoList?.[(i - 1 + listLength) % listLength]
                }
                itemRight={controller.photoList?.[(i + 1) % listLength]}
              />
            );
          })}
      </Carousel>
    </CommonPage>
  );
};

export default HomePage;
