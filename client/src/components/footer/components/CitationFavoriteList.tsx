import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import GradeIcon from "@mui/icons-material/Grade";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getACitationFavo } from "../../../redux/features/citationSlice";

import {
  createFavorite,
  getCitationFavorite,
} from "../../../redux/features/favoriteSlice";

import { Favorite } from "../../../utils/interface";

const CitationFavoriteList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { favorite } = useSelector((state: RootState) => state);

  const handleDeleteFavorite = (
    citation: string,
    personnage: string,
    episode: string
  ) => {
    dispatch(
      createFavorite({
        citation: citation,
        personnage: personnage,
        episode: episode,
      })
    );
    setTimeout(() => {
      dispatch(getCitationFavorite());
    }, 300);
    window.scrollTo(0, 0);
  };

  const handleChangeCitationFavo = (id: number) => {
    dispatch(getACitationFavo(id));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {favorite!.data &&
        favorite!.data.map((item: Favorite) => {
          return (
            <Grid
              container
              justifyContent="center"
              sx={{ position: "relative", borderBottom: "1px solid gray" }}
              key={item.id}
            >
              <Typography
                className="citation-list"
                sx={{
                  margin: "2rem 8rem",
                  textAlign: "center",
                  fontStyle: "normal ",
                  fontWeight: 500,
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCitationFavo(item.id)}
              >
                {item.citation}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  mr: "2rem",
                }}
                className="edit-btn"
                onClick={() =>
                  handleDeleteFavorite(
                    item.citation,
                    item.personnage,
                    item.episode
                  )
                }
              >
                <GradeIcon
                  sx={{
                    fontSize: "1.5rem",
                    marginRight: "1rem",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Grid>
          );
        })}
    </div>
  );
};

export default CitationFavoriteList;
