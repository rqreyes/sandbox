import { Backdrop, CircularProgress } from "@mui/material";

export const Loading = (): JSX.Element => {
  return (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
