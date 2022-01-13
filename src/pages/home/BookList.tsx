import { Button, Grid, List, Typography } from "@mui/material";
import axios from "axios";
import { Error } from "components/Error";
import { Loading } from "components/Loading";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { BookAddDialog } from "./BookAddDialog";
import { BookItem } from "./BookItem";

export interface BookItemData {
  author: string;
  id: string;
  title: string;
}

export const BookList = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isLoading } = useQuery<BookItemData[], Error>(
    "bookList",
    async (): Promise<BookItemData[]> => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/books`
      );

      return data;
    }
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      <Grid alignItems="center" container justifyContent="space-between">
        <Grid item>
          <Typography variant="h2">Book List</Typography>
        </Grid>
        <Grid item>
          <Button onClick={handleOpen}>Create</Button>
        </Grid>
      </Grid>
      <List>
        {React.Children.toArray(
          data?.map(({ author, id, title }) => (
            <BookItem author={author} id={id} title={title} />
          ))
        )}
      </List>
      <BookAddDialog handleClose={handleClose} isOpen={isOpen} />
    </>
  );
};
