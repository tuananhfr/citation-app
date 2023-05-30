import React, { useEffect } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  getACitationRandom,
  getRandomKaamelott,
} from "../../redux/features/citationSlice";

import Title from "./components/Title";
import InfoCitation from "./components/InfoCitation";
import TitleRandomCitation from "./components/TitleRandomCitation";
import RandomCitation from "./components/RandomCitation";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomKaamelott());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className="header-main">
      <Title />
      <InfoCitation />
      <Grid container justifyContent="center">
        <TitleRandomCitation />
        <RandomCitation />
      </Grid>
    </Container>
  );
};

export default Header;
