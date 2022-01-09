import { Alert, List } from "@mui/material";
import axios from "axios";
import { Loading } from "components/Loading";
import React from "react";
import { useQuery } from "react-query";

import { BookItem } from "./BookItem";

interface BookItemRes {
  author: string;
  id: string;
  title: string;
}

export const BookList = (): JSX.Element => {
  const { data, error, isLoading } = useQuery(
    "books",
    async (): Promise<BookItemRes[]> => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/books`
      );
      console.log("data: ", data);

      return data;
    }
  );

  if (isLoading) return <Loading />;
  if (error instanceof Error)
    return (
      <Alert severity="error">{`An error has occurred: ${error.message}`}</Alert>
    );

  return (
    <List>
      {React.Children.toArray(
        data?.map(({ author, title }) => (
          <BookItem author={author} title={title} />
        ))
      )}
    </List>
  );
};
