import { FC, useCallback, useState } from "react";
import CommonPage from "../common-page";
import { getFirebaseStorageRef } from "../../utils/firebase-utils/firebase-utils";
import Carousel from "react-material-ui-carousel";
import { IconButton, Paper, Stack } from "@mui/material";
import useListItems from "../../utils/firebase-utils/use-list-items";
import Image from "mui-image";
import styled from "styled-components";
import ZoomOutIcon from "@mui/icons-material/ZoomOutMap";
import { useModal } from "../../components/modal/use-modal";
import { toRem } from "../../utils/styled-components";
import { ModalContainer } from "../../components/modal/modal-container";

type CarouselItem = {
  url: string;
};

const StyledItem = styled(Paper)`
  width: 100%;
  height: 80vh;
`;

const StyledExpandLightBoxButton = styled(IconButton)`
  position: absolute !important;
  right: ${toRem(2)};
  top: ${toRem(2)};
  visibility: hidden;
`;

const StyledSpotlightImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &:hover {
    ${StyledExpandLightBoxButton} {
      visibility: visible;
      cursor: pointer;
    }
  }
`;

const SpotlightItem = ({
  item,
  itemLeft,
  itemRight,
  onClick,
}: {
  item: CarouselItem;
  itemLeft: CarouselItem | undefined;
  itemRight: CarouselItem | undefined;
  onClick: (item: CarouselItem) => void;
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
          fit="cover"
          style={{
            filter: "grayscale(100%)",
          }}
          wrapperStyle={{ width: "13%" }}
          duration={1}
        />
        <StyledSpotlightImageContainer>
          <Image
            src={item.url}
            alt=""
            showLoading
            fit="contain"
            wrapperStyle={{
              height: "100%",
              width: "maxContent",
              position: "relative",
            }}
            duration={1000}
          />
          <StyledExpandLightBoxButton
            aria-label="expand-image"
            onClick={() => onClick(item)}
          >
            <ZoomOutIcon />
          </StyledExpandLightBoxButton>
        </StyledSpotlightImageContainer>
        <Image
          src={itemRight?.url ?? "#"}
          alt=""
          bgColor="#808080"
          fit="cover"
          style={{
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
  const firebaseStorage = getFirebaseStorageRef();
  const { data: photoList, loading: photoListLoading } = useListItems({
    storageRef: firebaseStorage,
    fetchFiles: true,
  });
  const [lightBoxItem, setLightBoxItem] = useState<CarouselItem | null>(null);
  const {
    modalOpen: lightBoxOpen,
    onOpenModal: onOpenLightBox,
    onCloseModal: onCloseLightBox,
  } = useModal();

  const handleOpenLightBox = useCallback(
    (item: CarouselItem) => {
      setLightBoxItem(item);
      onOpenLightBox();
    },
    [onOpenLightBox]
  );

  const handleCloseLightBox = useCallback(() => {
    setLightBoxItem(null);
    onCloseLightBox();
  }, [onCloseLightBox]);

  return {
    photoList,
    photoListLoading,
    lightBoxItem,
    lightBoxOpen,
    handleOpenLightBox,
    handleCloseLightBox,
  };
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
          controller.photoList.files &&
          controller.photoList.files.length > 0 &&
          controller.photoList.files.map((file, i) => {
            const listLength = controller.photoList?.files?.length || 0;
            return (
              <SpotlightItem
                key={i}
                item={file}
                onClick={controller.handleOpenLightBox}
                itemLeft={
                  controller.photoList?.files?.[
                    (i - 1 + listLength) % listLength
                  ]
                }
                itemRight={controller.photoList?.files?.[(i + 1) % listLength]}
              />
            );
          })}
      </Carousel>
      {controller.lightBoxOpen && (
        <ModalContainer
          isModalOpen={controller.lightBoxOpen}
          onCloseModal={controller.handleCloseLightBox}
          ariaLabel="image-light-box"
        >
          <Image
            src={controller.lightBoxItem?.url ?? "#"}
            alt=""
            showLoading
            fit="contain"
            wrapperStyle={{
              height: "100%",
              width: "maxContent",
              position: "relative",
            }}
            duration={1000}
          />
        </ModalContainer>
      )}
    </CommonPage>
  );
};

export default HomePage;
