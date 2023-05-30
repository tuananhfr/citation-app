import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const TitleMesCitation: React.FC = () => {
  return (
    <Grid container justifyContent="center">
      <Typography sx={{ fontWeight: "bold", m: "2rem" }} variant="h4">
        Mes citations
      </Typography>
    </Grid>
  );
};

export default TitleMesCitation;
