import React from "react";
import { Box } from "@mui/material";
import { useLottie } from "lottie-react";
import loadingAnimation from "./loading.json";
import type { LoadingProps } from "./Loading.types";
import { Typography } from "../Typography";

export const Loading: React.FC<LoadingProps> = ({
  label = "Loading",
  size = 200,
}) => {
  const { View } = useLottie({ animationData: loadingAnimation, loop: true });

  return (
    <Box
      role="status"
      aria-label={label}
      sx={{ width: size, height: size, mx: "auto" }}
    >
      {View}
      <Typography
        sx={{
          textAlign: "center",
        }}
        fontSize="12"
      >
        {label}
      </Typography>
    </Box>
  );
};
