import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const TitleRandomCitation: React.FC = () => {
  return (
    <Grid item xs={12} container justifyContent="center">
      <Typography
        sx={{ fontWeight: "bold", mt: "2rem", fontSize: "1.5rem" }}
        variant="h4"
      >
        Afficher une autre citation
      </Typography>
    </Grid>
  );
};

export default TitleRandomCitation;
