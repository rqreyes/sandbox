import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

interface BookDeleteDialogProps {
  handleCloseDelete: () => void;
  id: string;
  isOpenDelete: boolean;
}

export const BookDeleteDialog: React.FC<BookDeleteDialogProps> = ({
  handleCloseDelete,
  id,
  isOpenDelete,
}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation<
    AxiosResponse,
    Error,
    string
  >((id) => axios.delete(`${process.env.REACT_APP_API_SERVER}/books/${id}`), {
    onError: (error) => {
      enqueueSnackbar(`An error has occurred: ${error.message}`, {
        variant: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("bookList");
      handleCloseDelete();
      enqueueSnackbar("Book deleted successfully", { variant: "success" });
    },
  });

  return (
    <Dialog onClose={handleCloseDelete} open={isOpenDelete}>
      <DialogTitle>Delete Book</DialogTitle>
      <DialogContent>Are you sure?</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelete}>Cancel</Button>
        <Button onClick={() => mutateDelete(id)}>
          {isLoadingDelete ? <CircularProgress size={20} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
