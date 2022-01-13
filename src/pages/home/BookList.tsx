import {
  Button,
  CircularProgress,
  Grid,
  List,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Error } from "components/Error";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { BookAddDialog } from "./BookAddDialog";
import { BookItem } from "./BookItem";

export interface BookItemData {
  author: string;
  id: string;
  title: string;
}

export interface FormInput {
  author: string;
  title: string;
}

export const BookList = (): JSX.Element => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const { data, error, isLoading } = useQuery<BookItemData[], Error>(
    "bookList",
    async (): Promise<BookItemData[]> => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/books`
      );

      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const handleOpenAdd = () => {
    setIsOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setIsOpenAdd(false);
  };

  return (
    <>
      {/* handle error */}
      {error && <Error error={error} />}

      <Grid alignItems="center" container justifyContent="space-between">
        <Grid item>
          <Typography variant="h2">Book List</Typography>
        </Grid>
        <Grid item>
          <Button onClick={handleOpenAdd}>Create</Button>
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid alignItems="center" container justifyContent="center">
          <CircularProgress sx={{ height: "100px" }} />
        </Grid>
      ) : (
        <List>
          {React.Children.toArray(
            data?.map(({ author, id, title }) => (
              <BookItem author={author} id={id} title={title} />
            ))
          )}
        </List>
      )}

      <BookAddDialog handleCloseAdd={handleCloseAdd} isOpenAdd={isOpenAdd} />
    </>
  );
};
