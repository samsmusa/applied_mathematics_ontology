import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};
