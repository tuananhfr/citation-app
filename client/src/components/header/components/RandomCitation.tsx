import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import {
  getACitationRandom,
  getRandomKaamelott,
} from "../../../redux/features/citationSlice";

const RandomCitation: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Grid container justifyContent="center" className="random-mobile">
      <Grid
        container
        justifyContent="center"
        sx={{ borderBottom: "1px solid gray", pb: 7 }}
      >
        <Button
          sx={{
            "&:hover": { backgroundColor: "background.paper" },
            textTransform: "none",
            color: "secondary.main",
            backgroundColor: "background.paper",
            border: "1px solid background.paper",
            borderRadius: "10px",
            mt: 3,
            mr: 3,
          }}
          onClick={() => dispatch(getACitationRandom())}
        >
          <RemoveRedEyeIcon sx={{ mr: 1 }} />
          <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            Parmi mes citatons
          </Typography>
        </Button>
        <Button
          sx={{
            "&:hover": { backgroundColor: "background.paper" },
            textTransform: "none",
            color: "secondary.main",
            backgroundColor: "background.paper",
            border: "1px solid background.paper",
            borderRadius: "10px",
            mt: 3,
          }}
        >
          <RemoveRedEyeIcon sx={{ mr: 1 }} />
          <Typography
            sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
            onClick={() => dispatch(getRandomKaamelott())}
          >
            Parmi les citatons de Kaamelott
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default RandomCitation;
