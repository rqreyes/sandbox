import { Alert } from "@mui/material";
import axios from "axios";
import { Loading } from "components/generic/Loading";
import React from "react";
import { useQuery } from "react-query";

interface BookItem {
  author: string;
  id: string;
  title: string;
}

export const Home = (): JSX.Element => {
  const { data, error, isLoading } = useQuery(
    "books",
    async (): Promise<Array<BookItem>> => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/books`
      );

      return data;
    }
  );

  if (isLoading) return <Loading />;
  if (error instanceof Error)
    return (
      <Alert severity="error">{`An error has occurred: ${error.message}`}</Alert>
    );

  return (
    <section>
      {React.Children.toArray(
        data?.map((bookItem: BookItem) => <p>{bookItem.author}</p>)
      )}
    </section>
  );
};
