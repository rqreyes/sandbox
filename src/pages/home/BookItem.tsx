import { Delete, Edit, Info } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";

import { BookItemData } from "./BookList";
import { BookUpdateDialog } from "./BookUpdateDialog";

interface BookItemProps extends BookItemData {
  lastItem: boolean;
}

export const BookItem: React.FC<BookItemProps> = ({
  author,
  id,
  lastItem,
  title,
}): JSX.Element => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  // delete book item
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation<
    AxiosResponse,
    Error,
    string
  >((id) => axios.delete(`${process.env.REACT_APP_API_SERVER}/books/${id}`), {
    onError: (error) => {
      enqueueSnackbar(`An error has occurred: ${error.message}`, {
        variant: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("bookList");
      enqueueSnackbar("Book deleted successfully", { variant: "success" });
    },
  });
  const handleOpenUpdate = () => {
    setIsOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setIsOpenUpdate(false);
  };

  return (
    <>
      <ListItem>
        <ListItemText>
          <strong>{title}</strong>
          <br />
          {author}
        </ListItemText>
        <NavLink to={`/book-info/${id}`}>
          <Button>
            <Info />
          </Button>
        </NavLink>
        <Button onClick={handleOpenUpdate}>
          <Edit />
        </Button>
        <Button onClick={() => mutateDelete(id)}>
          {isLoadingDelete ? <CircularProgress size={20} /> : <Delete />}
        </Button>
      </ListItem>
      {!lastItem && <Divider />}

      <BookUpdateDialog
        handleCloseUpdate={handleCloseUpdate}
        id={id}
        isOpenUpdate={isOpenUpdate}
      />
    </>
  );
};
