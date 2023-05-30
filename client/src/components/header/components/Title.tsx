import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const InfoCitation: React.FC = () => {
  return (
    <Grid container justifyContent="center">
      <Typography sx={{ fontWeight: "bold", m: "2rem" }} variant="h3">
        Citations
      </Typography>
    </Grid>
  );
};

export default InfoCitation;
