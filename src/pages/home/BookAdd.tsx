import { Add } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

interface FormInput {
  author: string;
  title: string;
}

export const BookAdd = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = {
    author: "",
    title: "",
  };
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const { error, isLoading, mutate } = useMutation<
    AxiosResponse,
    Error,
    FormInput
  >(
    (bookNew) =>
      axios.post(`${process.env.REACT_APP_API_SERVER}/books`, bookNew),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("bookList");
        reset(defaultValues);
        enqueueSnackbar("Book added successfully", { variant: "success" });
      },
    }
  );
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    mutate(data);
  };

  if (error) {
    enqueueSnackbar(`An error has occurred: ${error.message}`, {
      variant: "error",
    });
  }

  return (
    <Box px={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          alignItems="center"
          container
          justifyContent="flex-end"
          spacing={4}
        >
          <Grid item xs={4}>
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
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
          <Grid item sx={{ textAlign: "right" }} xs={4}>
            <Button type="submit">
              {isLoading ? <CircularProgress size={20} /> : <Add />}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
