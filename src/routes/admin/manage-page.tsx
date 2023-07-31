import { FC, useCallback, useEffect, useState } from "react";
import CommonPage from "../common-page";
import { DndProvider } from "react-dnd";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Tree,
  MultiBackend,
  getDescendants,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { NodeCustomData, NodeModel } from "./components/types";
import { DragNode } from "./components/drag-node";
import { AddDialog } from "./components/add-dialog";
import styles from "./components/tree.module.css";

import { AdminLayout } from "./components/admin-layout";
import { styled } from "styled-components";
import { getFirebaseStorageRef } from "../../utils/firebase-utils/firebase-utils";
import useListItems, {
  ListItems,
} from "../../utils/firebase-utils/use-list-items";
import FullScreenLoadingIndicator from "../../components/full-screen-loading-indicator/full-screen-loading-indicator";
import {
  FileType,
  useUploadManyFiles,
} from "../../utils/firebase-utils/use-upload-many-files";

const StyledContainer = styled.div`
  height: 100%;
  ul {
    list-style: none;
    padding-left: 0;
  }
`;

const getLastId = (treeData: NodeModel[]): number => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id as number;
  }

  return 0;
};

const convertStringToNumber = (input: string): number => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash += input.charCodeAt(i);
  }
  return hash;
};

const listItemsToTreeData = ({
  listItems,
  parent,
}: {
  listItems: ListItems | undefined;
  parent: number;
}): NodeModel<NodeCustomData>[] => {
  if (!listItems) return [];

  const folderNodes: NodeModel<NodeCustomData>[] =
    listItems?.folders?.map((folder) => ({
      id: convertStringToNumber(folder.name),
      parent: parent,
      droppable: true,
      text: folder.name,
    })) ?? [];

  const fileNodes: NodeModel<NodeCustomData>[] =
    listItems?.files?.map((file) => ({
      id: convertStringToNumber(file.name),
      parent: parent,
      text: file.name,
      data: {
        fileType: "image",
      },
    })) ?? [];

  return [...folderNodes, ...fileNodes];
};

const useManagePage = () => {
  const firebaseStorage = getFirebaseStorageRef();
  const storageRef = getFirebaseStorageRef();
  const { uploadManyFiles, createFolder, uploading } = useUploadManyFiles();
  const { data: listItems, loading: listItemsLoading } = useListItems({
    storageRef: firebaseStorage,
    fetchFolders: true,
    fetchFiles: true,
  });

  const initialTreeData = listItemsToTreeData({ listItems, parent: 0 });
  const [treeData, setTreeData] = useState<NodeModel<NodeCustomData>[]>([]);

  const handleDrop = useCallback(
    (newTree: NodeModel<NodeCustomData>[]) => setTreeData(newTree),
    []
  );

  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = useCallback(
    (id: NodeModel["id"]) => {
      const deleteIds = [
        id,
        ...getDescendants(treeData, id).map((node) => node.id),
      ];
      const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

      setTreeData(newTree);
    },
    [treeData]
  );

  const handleOpenDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const handleTextChange = useCallback(
    (id: NodeModel["id"], value: string) => {
      const newTree = treeData.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            text: value,
          };
        }

        return node;
      });

      setTreeData(newTree);
    },
    [treeData]
  );

  const handleSubmit = useCallback(
    async (newNode: Omit<NodeModel<NodeCustomData>, "id">) => {
      const res = await createFolder({ storageRef, folderName: "2019" });

      const lastId = getLastId(treeData) + 1;

      setTreeData([
        ...treeData,
        {
          ...newNode,
          id: lastId,
        },
      ]);
      setOpen(false);
    },
    [storageRef, treeData, uploadManyFiles]
  );

  useEffect(() => {
    if (!listItemsLoading) {
      setTreeData(initialTreeData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listItemsLoading]);

  return {
    open,
    treeData,
    listItemsLoading,
    handleDrop,
    handleDelete,
    handleOpenDialog,
    handleCloseDialog,
    handleTextChange,
    handleSubmit,
  };
};

const ManagePage: FC = (): JSX.Element | null => {
  const controller = useManagePage();

  if (controller.listItemsLoading) {
    <CommonPage pageName="Manage">
      <AdminLayout>
        <FullScreenLoadingIndicator />
      </AdminLayout>
    </CommonPage>;
  }

  return (
    <CommonPage pageName="Manage">
      <AdminLayout>
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          <StyledContainer>
            <div>
              <Button
                onClick={controller.handleOpenDialog}
                startIcon={<AddIcon />}
                color="secondary"
              >
                Add Folder
              </Button>
              {controller.open && (
                <AddDialog
                  tree={controller.treeData}
                  onClose={controller.handleCloseDialog}
                  onSubmit={controller.handleSubmit}
                />
              )}
            </div>
            <Tree
              tree={controller.treeData}
              rootId={0}
              render={(node: NodeModel<NodeCustomData>, options) => (
                <DragNode
                  node={node}
                  {...options}
                  onDelete={controller.handleDelete}
                  onTextChange={controller.handleTextChange}
                />
              )}
              onDrop={controller.handleDrop}
              classes={{
                root: styles["treeRoot"],
                draggingSource: styles["draggingSource"],
                dropTarget: styles["dropTarget"],
              }}
            />
          </StyledContainer>
        </DndProvider>
      </AdminLayout>
    </CommonPage>
  );
};

export default ManagePage;
