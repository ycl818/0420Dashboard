import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adjustVariable,
  fetchErrorShowBorder,
  updateDataByURL,
} from "../store";
import axios from "axios";

const VariablesBlock = () => {
  const dispatch = useDispatch();
  let variablesArray = useSelector((state) => {
    return state.variable.variableArray;
  });

  const [inputs, setInputs] = useState(variablesArray);

  const { panelURLs } = useSelector((state) => {
    const panelURLs = state.widget.widgetArray.map((panel) => {
      return { id: panel.i, url: panel.data.datasource_url };
    });
    return { panelURLs };
  });

  const handleChange = (e) => {
    let updatedVariablesArray = variablesArray.map((variable) => {
      return variable.variableName === e.target.name
        ? { ...variable, defaultValue: e.target.value }
        : variable;
    });
    setInputs(updatedVariablesArray);
  };

  const handleOnBlur = (e) => {
    dispatch(adjustVariable({ inputs }));
    /*
      step 1: check panels which contains modified variables
    */

    const filteredURLs = panelURLs.filter((panel) =>
      panel.url.includes(e.target.name)
    );
    console.log(
      "file: VariablesBlock.jsx:44 ~ handleOnBlur ~ filteredURLs:",
      filteredURLs
    );

    const newPanelsURL = filteredURLs?.map((panel) => {
      let newUrl = panel.url;
      inputs.forEach((variable) => {
        if (newUrl.includes(`@${variable.variableName}`)) {
          newUrl = newUrl.replace(
            new RegExp(`@${variable.variableName}`, "g"),
            variable.defaultValue
          );
        }
      });
      return { id: panel.id, url: newUrl };
    });
    // Step 2: Send all URLs at the same time using Promise.all()
    Promise.all(
      newPanelsURL.map(async (panel) => {
        try {
          const response = await axios.get(panel.url);
          const id = panel.id;
          let result = response?.data;
          const res = false;
          const message = "";
          // find url is in which panel then update
          dispatch(updateDataByURL({ result, id }));
          dispatch(fetchErrorShowBorder({ res, id, message }));
        } catch (error) {
          const id = panel.id;
          const res = true;
          const message = error.message;
          dispatch(fetchErrorShowBorder({ res, id, message }));
          console.log(
            "file: variablesArea.jsx:65 ~ newPanelsURL.map ~ error:",
            error
          );
        }
      })
    )
      .then((responses) => {
        console.log(responses);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {variablesArray.map((variable) => {
        return (
          <Box
            sx={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}
            key={variable.id}
          >
            <Button
              value={variable.variableName}
              disableRipple
              disableFocusRipple
              disableElevation
              sx={{
                color: "#5B9AFF",
                backgroundColor: "#181B1F",
                width: "10%",
                textTransform: "none",
                "&:hover": { backgroundColor: "#181B1F", cursor: "auto" },
              }}
              variant="contained"
            >
              {variable.variableName}
            </Button>

            <TextField
              name={variable.variableName}
              sx={{
                width: { sm: 50, md: 100 },
                marginBottom: "1rem",
              }}
              variant="outlined"
              size="small"
              value={inputs.defaultValue}
              defaultValue={`${variable.defaultValue}`}
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default VariablesBlock;
