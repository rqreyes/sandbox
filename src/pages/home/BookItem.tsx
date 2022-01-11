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
import { useMutation, useQueryClient } from "react-query";

import { BookItemData } from "./BookList";

export const BookItem: React.FC<BookItemData> = ({
  author,
  id,
  title,
}): JSX.Element => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { error, isLoading, mutate } = useMutation<
    AxiosResponse,
    Error,
    string
  >((id) => axios.delete(`${process.env.REACT_APP_API_SERVER}/books/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("bookList");
      enqueueSnackbar("Book deleted successfully", { variant: "success" });
    },
  });

  if (error) {
    enqueueSnackbar(`An error has occurred: ${error.message}`, {
      variant: "error",
    });
  }

  return (
    <>
      <ListItem>
        <ListItemText>
          <strong>{title}</strong>
          <br />
          {author}
        </ListItemText>
        <Button>
          <Edit />
        </Button>
        <Button onClick={() => mutate(id)}>
          {isLoading ? <CircularProgress size={20} /> : <Delete />}
        </Button>
      </ListItem>
      <Divider />
    </>
  );
};
