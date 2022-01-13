import { Delete, Edit } from "@mui/icons-material";
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
import { useMutation, useQuery, useQueryClient } from "react-query";

import { BookItemData } from "./BookList";
import { BookUpdateDialog } from "./BookUpdateDialog";

export const BookItem: React.FC<BookItemData> = ({
  author,
  id,
  title,
}): JSX.Element => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  // get book item for updating
  const {
    data: dataGet,
    error: errorGet,
    isFetching: isFetchingGet,
    refetch: refetchGet,
  } = useQuery<BookItemData, Error>(
    "bookItem",
    async (): Promise<BookItemData> => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/books/${id}`
      );

      return data;
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
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
    refetchGet();
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
        <Button onClick={handleOpenUpdate}>
          <Edit />
        </Button>
        <Button onClick={() => mutateDelete(id)}>
          {isLoadingDelete ? <CircularProgress size={20} /> : <Delete />}
        </Button>
      </ListItem>
      <Divider />

      <BookUpdateDialog
        handleCloseUpdate={handleCloseUpdate}
        dataGet={dataGet}
        errorGet={errorGet}
        id={id}
        isFetchingGet={isFetchingGet}
        isOpenUpdate={isOpenUpdate}
      />
    </>
  );
};
