import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { Error } from "components/Error";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { BookItemData, FormInput } from "./BookList";

interface BookUpdateDialogProps {
  dataGet: BookItemData | undefined;
  errorGet: Error | null;
  handleCloseUpdate: () => void;
  id: string;
  isFetchingGet: boolean;
  isOpenUpdate: boolean;
}

export const BookUpdateDialog: React.FC<BookUpdateDialogProps> = ({
  dataGet,
  errorGet,
  handleCloseUpdate,
  id,
  isFetchingGet,
  isOpenUpdate,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const defaultValues = {
    author: "",
    title: "",
  };
  const { control, handleSubmit, reset } = useForm({ defaultValues });
  // update book item
  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation<
    AxiosResponse,
    Error,
    FormInput
  >(
    (data) =>
      axios.put(`${process.env.REACT_APP_API_SERVER}/books/${id}`, data),
    {
      onError: (error) => {
        enqueueSnackbar(`An error has occurred: ${error.message}`, {
          variant: "error",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("bookList");
        reset(defaultValues);
        handleCloseUpdate();
        enqueueSnackbar("Book updated successfully", { variant: "success" });
      },
    }
  );
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    mutateUpdate(data);
  };

  useEffect(() => {
    if (dataGet) reset({ author: dataGet.author, title: dataGet.title });
  }, [dataGet, reset]);

  return (
    <Dialog onClose={handleCloseUpdate} open={isOpenUpdate}>
      {/* handle error */}
      {errorGet && <Error error={errorGet} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Update Book</DialogTitle>
        {isFetchingGet ? (
          <Grid alignItems="center" container justifyContent="center" pb={4}>
            <CircularProgress sx={{ height: 100 }} />
          </Grid>
        ) : (
          <>
            <DialogContent>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Title"
                    variant="standard"
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="author"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Author"
                    variant="standard"
                    {...field}
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit">
                {isLoadingUpdate ? <CircularProgress size={20} /> : "Update"}
              </Button>
              <Button onClick={handleCloseUpdate}>Cancel</Button>
            </DialogActions>
          </>
        )}
      </form>
    </Dialog>
  );
};
