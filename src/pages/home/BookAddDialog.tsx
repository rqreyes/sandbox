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
import { useSnackbar } from "notistack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

interface BookAddDialogProps {
  handleClose: () => void;
  isOpen: boolean;
}

interface FormInput {
  author: string;
  title: string;
}

export const BookAddDialog: React.FC<BookAddDialogProps> = ({
  handleClose,
  isOpen,
}) => {
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
        handleClose();
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
    <Dialog onClose={handleClose} open={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create Book</DialogTitle>
        <DialogContent>
          <Grid
            alignItems="center"
            container
            justifyContent="flex-end"
            spacing={4}
          >
            <Grid item>
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
            <Grid item>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            {isLoading ? <CircularProgress size={20} /> : "Create"}
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
