import React, { useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getRandomKaamelott } from "../../../redux/features/citationSlice";
import {
  createFavorite,
  getCitationFavorite,
} from "../../../redux/features/favoriteSlice";

const InfoCitation: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { citation } = useSelector((state: RootState) => state);
  useEffect(() => {
    dispatch(getRandomKaamelott());
  }, [dispatch]);

  const commonStyles = {
    pt: 6,
    pb: 3,
    backgroundColor: "#f5f5f5",
    border: 4,
    width: "100%",
    height: "auto",
    borderRadius: "1rem",
  };

  const handleAddFavorite = () => {
    if (
      citation!.singleCitation!.personnage &&
      citation!.singleCitation!.episode
    ) {
      dispatch(
        createFavorite({
          citation: citation!.singleCitation!.citation,
          personnage: citation!.singleCitation!.personnage,
          episode: citation!.singleCitation!.episode,
        })
      );
      setTimeout(() => {
        dispatch(getCitationFavorite());
      }, 300);
    }
  };
  return (
    <Box sx={{ ...commonStyles, borderColor: "secondary.main" }}>
      <Grid style={{ width: "80%" }} sx={{ m: "auto" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "secondary.main",
            fontSize: "1.6rem",
          }}
          variant="h4"
        >
          "{citation!.singleCitation && citation!.singleCitation!.citation}"
        </Typography>
      </Grid>
      <Grid style={{ width: "90%" }} sx={{ m: "auto" }}>
        <Typography
          sx={{
            textAlign: "end",
            fontWeight: "500",
            fontStyle: "italic",
            color: "secondary.main",
            fontSize: "1.5rem",
            mt: 2,
          }}
          variant="h3"
        >
          {citation!.singleCitation?.personnage
            ? `${citation!.singleCitation.personnage} - "${
                citation!.singleCitation.episode
              }"`
            : ""}
        </Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Button
          sx={{
            "&:hover": { backgroundColor: "#f5f5f5" },

            color: "secondary.main",
            textTransform: "none",

            mt: 3,
          }}
          onClick={() => handleAddFavorite()}
        >
          {citation!.singleCitation?.personnage ? (
            <StarBorderIcon
              sx={{
                color: "secondary.main",
                fontSize: "1.5rem",

                mr: 1,
              }}
            />
          ) : (
            ""
          )}{" "}
          <Typography sx={{ borderBottom: 2, fontWeight: "600" }}>
            {citation!.singleCitation?.personnage ? "Mettre en favoris" : ""}
          </Typography>
        </Button>
      </Grid>
    </Box>
  );
};

export default InfoCitation;
