import { Alert } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

import { Loading } from "components/generic/Loading";

interface iBookItem {
  author: string;
  id: string;
  title: string;
}

export const Home = () => {
  const { data, error, isLoading } = useQuery("books", async (): Promise<any> => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/books`);
    return data;
  });

  if (isLoading) return <Loading />;
  if (error instanceof Error)
    return <Alert severity="error">{`An error has occurred: ${error.message}`}</Alert>;

  return (
    <section>{React.Children.toArray(data.map((bookItem: iBookItem) => <p>{bookItem.author}</p>))}</section>
  );
};
