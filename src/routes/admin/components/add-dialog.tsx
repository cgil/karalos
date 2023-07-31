import React, { useCallback, useState } from "react";
import {
  Button,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
} from "@mui/material";
import { NodeCustomData, NodeModel } from "./types";
import { toRem } from "../../../utils/styled-components";

type Props = {
  tree: NodeModel<NodeCustomData>[];
  onClose: () => void;
  onSubmit: (e: Omit<NodeModel<NodeCustomData>, "id">) => void;
};

export const AddDialog: React.FC<Props> = (props) => {
  const [text, setText] = useState<string>("");
  const [parent, setParent] = useState<number>(0);

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );

  const handleChangeParent = useCallback((e: SelectChangeEvent<number>) => {
    setParent(Number(e.target.value));
  }, []);

  return (
    <Dialog open={true} onClose={props.onClose} fullWidth>
      <DialogTitle>Add New Folder</DialogTitle>
      <DialogContent sx={{ display: "grid", gap: toRem(16) }}>
        <div>
          <TextField
            label="Name"
            onChange={handleChangeText}
            value={text}
            fullWidth
          />
        </div>
        <div>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>Parent</InputLabel>
            <Select label="Parent" onChange={handleChangeParent} value={parent}>
              <MenuItem value={0}>(top level)</MenuItem>
              {props.tree
                .filter((node) => node.droppable === true)
                .map((node) => (
                  <MenuItem key={node.id} value={node.id}>
                    {node.text}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          disabled={text === ""}
          onClick={() =>
            props.onSubmit({
              text,
              parent,
              droppable: true,
              data: {
                fileType: "image",
              },
            })
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
