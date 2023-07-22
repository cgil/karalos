import React, { FC } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styled from "styled-components";
import { toRem } from "../../utils/styled-components";

export type ModalContainerProps = {
  ariaLabel: string;
  className?: string;
  isModalOpen: boolean;
  onCloseModal?: () => void;
  children?: React.ReactNode;
};

const StyledBackdrop = styled(Backdrop)``;

const StyledBox = styled(Box)`
  background-color: "white";
  border-radius: ${toRem(4)};
  box-shadow: 0px 0px ${toRem(12)} rgba(0, 0, 0, 0.1);
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: ${toRem(848)};
  min-height: ${toRem(200)};
  max-height: 100vh;
  overflow-y: auto;
  width: 100vw;
`;

export const ModalContainer: FC<ModalContainerProps> = (props): JSX.Element => (
  <Modal
    aria-label={props.ariaLabel}
    closeAfterTransition
    onClose={props.onCloseModal}
    open={props.isModalOpen}
    components={{ Backdrop: StyledBackdrop }}
    componentsProps={{ backdrop: { timeout: 500 } }}
  >
    <Fade in={props.isModalOpen}>
      <StyledBox alignItems="center" className={props.className}>
        {props.children}
      </StyledBox>
    </Fade>
  </Modal>
);
