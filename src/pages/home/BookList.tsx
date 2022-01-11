import { List } from "@mui/material";
import axios from "axios";
import { Error } from "components/Error";
import { Loading } from "components/Loading";
import React from "react";
import { useQuery } from "react-query";

import { BookItem } from "./BookItem";

export interface BookItemData {
  author: string;
  id: string;
  title: string;
}

export const BookList = (): JSX.Element => {
  const { data, error, isLoading } = useQuery<BookItemData[], Error>(
    "bookList",
    async (): Promise<BookItemData[]> => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/books`
      );

      return data;
    }
  );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <List>
      {React.Children.toArray(
        data?.map(({ author, id, title }) => (
          <BookItem author={author} id={id} title={title} />
        ))
      )}
    </List>
  );
};
