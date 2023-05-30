import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  deleteACitation,
  getACitation,
  getAllCitations,
  updateACitation,
} from "../../../redux/features/citationSlice";
import { Backdrop } from "@mui/material";
import { Citation } from "../../../utils/interface";

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

const CitationList: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleOpenEdit = (item: Citation) => {
    setIsEdit(true);
    formik.values.id = item.id;
    formik.values.citation = item.citation;
  };

  const handleCloseEdit = () => {
    setIsEdit(false);
    formik.values.id = 0;
    formik.values.citation = "";
  };
  const dispatch: AppDispatch = useDispatch();
  const { citation } = useSelector((state: RootState) => state);

  const handleDelete = (id: number) => {
    dispatch(deleteACitation(id));
    setTimeout(() => {
      dispatch(getAllCitations());
    }, 300);
    window.scrollTo(0, 0);
  };

  const formik = useFormik({
    initialValues: {
      id: 0,
      citation: "",
    },
    validationSchema: createCitationSchema,
    onSubmit: (values) => {
      dispatch(updateACitation(values));
      handleCloseEdit();

      formik.resetForm();
      window.scrollTo(0, 0);

      setTimeout(() => {
        dispatch(getAllCitations());
      }, 300);
    },
  });

  const handleChangeCitation = (id: number) => {
    dispatch(getACitation(id));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {citation!.data &&
        citation!.data.map((item: Citation) => {
          return (
            <Grid
              key={item.id}
              container
              justifyContent="center"
              sx={{ position: "relative", borderBottom: "1px solid gray" }}
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
                onClick={() => handleChangeCitation(item.id)}
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
              >
                <DeleteIcon
                  sx={{
                    fontSize: "1.5rem",
                    marginRight: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(item.id)}
                />
                <CreateIcon
                  sx={{ fontSize: "1.5rem", cursor: "pointer" }}
                  onClick={() => handleOpenEdit(item)}
                />
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={isEdit}
                  onClose={handleCloseEdit}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Fade in={isEdit}>
                    <Box sx={style}>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ textAlign: "center" }}
                      >
                        Modifier une citation
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
              </Box>
            </Grid>
          );
        })}
    </div>
  );
};

export default CitationList;
