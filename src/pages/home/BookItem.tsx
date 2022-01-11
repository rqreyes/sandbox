import { Delete, Edit } from "@mui/icons-material";
import { Button, Divider, ListItem, ListItemText } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { useMutation, useQueryClient } from "react-query";

import { BookItemData } from "./BookList";

export const BookItem: React.FC<BookItemData> = ({
  author,
  id,
  title,
}): JSX.Element => {
  const queryClient = useQueryClient();
  const { error, isLoading, mutate } = useMutation<
    AxiosResponse,
    Error,
    string
  >((id) => axios.delete(`${process.env.REACT_APP_API_SERVER}/books/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("bookList");
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

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
          <Delete />
        </Button>
      </ListItem>
      <Divider />
    </>
  );
};
