import { Delete, Info, Edit as Update } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BookDeleteDialog } from "./BookDeleteDialog";
import { BookUpdateDialog } from "./BookUpdateDialog";

interface BookItemMenuProps {
  id: string;
}

export const BookItemMenu: React.FC<BookItemMenuProps> = ({
  id,
}): JSX.Element => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const navigate = useNavigate();
  const handleOpenUpdate = () => {
    setIsOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setIsOpenUpdate(false);
  };
  const handleOpenDelete = () => {
    setIsOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setIsOpenDelete(false);
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          navigate(`/book-info/${id}`);
        }}
      >
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText>More Info</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOpenUpdate}>
        <ListItemIcon>
          <Update />
        </ListItemIcon>
        <ListItemText>Update</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOpenDelete}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>

      {/* update dialog */}
      <BookUpdateDialog
        handleCloseUpdate={handleCloseUpdate}
        id={id}
        isOpenUpdate={isOpenUpdate}
      />

      {/* delete dialog */}
      <BookDeleteDialog
        handleCloseDelete={handleCloseDelete}
        id={id}
        isOpenDelete={isOpenDelete}
      />
    </>
  );
};
