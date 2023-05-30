import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import AddIcon from "@mui/icons-material/Add";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  createACitation,
  getAllCitations,
} from "../../../redux/features/citationSlice";
import { Backdrop } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
let createCitationSchema = yup.object().shape({
  citation: yup.string().required("Citation is Required"),
});

const AddBtn: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    formik.values.citation = "";
  };

  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      citation: "",
    },
    validationSchema: createCitationSchema,
    onSubmit: (values) => {
      dispatch(createACitation(values.citation));
      handleClose();

      formik.resetForm();
      window.scrollTo(0, 0);

      setTimeout(() => {
        dispatch(getAllCitations());
      }, 300);
    },
  });

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Ajouter une citation
            </Typography>
            <form
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column gap-15"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Citation"
                type="text"
                name="citation"
                value={formik.values.citation}
                onChange={formik.handleChange("citation")}
                onBlur={formik.handleBlur("citation")}
                sx={{ width: "100%", m: "1rem 0" }}
              />
              <Grid container justifyContent="center">
                <Button type="submit">valider</Button>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Button
        sx={{
          "&:hover": { backgroundColor: "secondary.main" },
          p: 1.5,
          backgroundColor: "secondary.main",
          textTransform: "none",
          borderRadius: "10px",
          mr: 3,
        }}
        className="add-btn"
        onClick={handleOpen}
      >
        <AddIcon sx={{ mr: 1, color: "white" }} />
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "white",
          }}
        >
          Ajouter une citation
        </Typography>
      </Button>
    </div>
  );
};

export default AddBtn;
