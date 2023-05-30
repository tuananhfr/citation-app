import React, { useEffect } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getAllCitations } from "../../redux/features/citationSlice";

import { getCitationFavorite } from "../../redux/features/favoriteSlice";
import TitleMesCitation from "./components/TitleMesCitation";
import AddBtn from "./components/AddBtn";
import Search from "./components/Search";

import CitationFavoriteList from "./components/CitationFavoriteList";
import CitationList from "./components/CitationList";

const Footer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCitations());
    dispatch(getCitationFavorite());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <TitleMesCitation />
      <Grid
        container
        sx={{ borderBottom: "1px solid gray", pb: 7 }}
        className="display-block"
      >
        <AddBtn />
        <Search />
      </Grid>
      <CitationList />

      <CitationFavoriteList />
    </Container>
  );
};

export default Footer;
