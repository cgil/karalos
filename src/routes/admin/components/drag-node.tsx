import React, { useCallback, useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { ArrowRight, Delete } from "@mui/icons-material";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { NodeCustomData, NodeModel } from "./types";
import { TypeIcon } from "./type-icon";
import { toRem } from "../../../utils/styled-components";
import { TextField } from "@mui/material";
import { styled } from "styled-components";

type DragNodeProps = {
  node: NodeModel<NodeCustomData>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onDelete: (id: NodeModel["id"]) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
};

const StyledInputTextField = styled(TextField)`
  && .MuiInputBase-input {
    padding: ${toRem(3)};
  }
`;

export const DragNode: React.FC<DragNodeProps> = (props) => {
  const [hover, setHover] = useState<boolean>(false);
  const [visibleInput, setVisibleInput] = useState(false);
  const { id, droppable, data, text } = props.node;
  const [labelText, setLabelText] = useState(text);
  const indent = props.depth * 24;

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      props.onToggle(props.node.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onToggle]
  );

  const handleShowInput = useCallback(() => {
    setVisibleInput(true);
  }, []);

  const handleCancel = useCallback(() => {
    setLabelText(text);
    setVisibleInput(false);
  }, [text]);

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabelText(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  }, [id, labelText, props]);

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={`tree-node root`}
      style={{
        paddingInlineStart: indent,
        alignItems: "center",
        display: "grid",
        gridTemplateColumns: "auto auto 1fr auto auto",
        height: toRem(32),
        paddingInlineEnd: toRem(8),
        width: "fit-content",
        maxWidth: toRem(400),
      }}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          alignItems: "center",
          fontSize: 0,
          cursor: "pointer",
          display: "flex",
          height: toRem(24),
          justifyContent: "center",
          width: toRem(24),
          transition: "transform linear 0.1s",
          transform: props.isOpen ? "rotate(90deg)" : "rotate(0deg)",
        }}
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRight />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable ?? false} fileType={data?.fileType} />
      </div>
      <div style={{ paddingInlineStart: toRem(8) }}>
        {visibleInput ? (
          <div
            style={{
              alignItems: "center",
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              justifyContent: "flex-start",
            }}
          >
            <StyledInputTextField
              value={labelText}
              onChange={handleChangeText}
              size="small"
              required
              placeholder="Name"
            />
            <IconButton
              size="small"
              onClick={handleSubmit}
              disabled={labelText === ""}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ) : (
          <div
            style={{
              alignItems: "center",
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="body2" sx={{ paddingRight: toRem(16) }}>
              {props.node.text}
            </Typography>
          </div>
        )}
      </div>
      {hover && !visibleInput && (
        <>
          <div style={{ padding: "0 4px" }}>
            <IconButton size="small" onClick={handleShowInput}>
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
          <div>
            <IconButton size="small" onClick={() => props.onDelete(id)}>
              <Delete fontSize="small" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};
