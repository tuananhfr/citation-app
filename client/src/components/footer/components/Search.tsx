import React, { useState } from "react";

import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import SearchIcon from "@mui/icons-material/Search";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getACitation } from "../../../redux/features/citationSlice";
import { IconButton } from "@mui/material";

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState<number | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const { citation } = useSelector((state: RootState) => state);

  const handleChangeCitation = (id: number) => {
    dispatch(getACitation(id));
    window.scrollTo(0, 0);
  };

  return (
    <Grid sx={{ flexGrow: 1, borderRadius: "10px", position: "relative" }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={citation!.data.map((option) => option.citation)}
        onChange={(event, value) => {
          if (value) {
            const selectedOption = citation!.data.find(
              (option) => option.citation === value
            );
            if (selectedOption) {
              setSearchValue(selectedOption.id);
            }
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#9411ab",
                },
                "&:hover fieldset": {
                  borderColor: "#9411ab",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#9411ab",
                },
              },
              "& .MuiInputBase-input": {
                marginRight: "2rem",
              },
            }}
            autoFocus
            placeholder="Rechercher dans mes citations"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />

      <IconButton
        sx={{
          fontSize: "2rem",
          position: "absolute",
          right: 3,
          top: 0,
          bottom: 0,
          color: "#9411ab",
          cursor: "pointer",
        }}
        disabled={searchValue === null ? true : false}
        onClick={() => handleChangeCitation(searchValue!)}
      >
        <SearchIcon />
      </IconButton>
    </Grid>
  );
};

export default Search;
