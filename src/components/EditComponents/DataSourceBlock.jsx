import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchErrorShowBorder,
  updateData,
  updateDataSourceWithURL,
} from "../../store";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useRef, useState } from "react";
import axios from "axios";
import InspectDrawer from "../InspectDrawer";
import VariableAccordion from "./DataSourceComponent/VariableAccordion";
import RealTimeChart from "../testComponents/RealTimeChart";

const DataSourceBlock = ({ panelID }) => {
  const dispatch = useDispatch();
  const textRef = useRef("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { datasource_url, fetchError, fetchErrorMessage } = useSelector(
    (state) => {
      const panelArray = state.widget.widgetArray;
      const targetPanel = panelArray.filter((panel) => panel.i === panelID);
      return {
        datasource_url: targetPanel[0]?.data?.datasource_url,
        fetchError: targetPanel[0]?.fetchError,
        fetchErrorMessage: targetPanel[0]?.fetchErrorMessage,
      };
    }
  );

  const [textValue, setTextValue] = useState(datasource_url || "");

  let variablesArray = useSelector((state) => {
    return state.variable.variableArray;
  });

  const fetchURl = async (variablesArray, currentText) => {
    try {
      // Define default values for each variable
      let defaultValues = {};

      variablesArray.forEach(({ variableName, defaultValue }) => {
        defaultValues[variableName] = defaultValue;
      });
      console.log(
        "🚀 ~ file: DataSourceBlock.jsx:41 ~ fetchURl ~ defaultValues:",
        defaultValues
      );
      console.log("before Regex ARRAY: ", variablesArray);

      console.log("before regex:", currentText);

      currentText = currentText.replace(/\@(\w+)/g, (match, variableName) => {
        const variableValue = defaultValues[variableName];
        return variableValue !== undefined ? variableValue : match;
      });
      console.log("after regex:", currentText);
      if (currentText === "http://localhost:5001/updates") return;
      if (currentText === "http://localhost:5001/updates/v2") return;
      const response = await axios.get(currentText);
      const data = response.data;
      dispatch(updateData({ data, panelID }));
      const res = false;
      const id = panelID;
      const message = "";
      dispatch(fetchErrorShowBorder({ id, res, message }));
    } catch (error) {
      const res = true;
      const id = panelID;
      const message = error.message;
      dispatch(fetchErrorShowBorder({ id, res, message }));
    }
  };

  const handleSetURL = (datasourceName, datasource_url, panelID) => {
    dispatch(
      updateDataSourceWithURL({ datasourceName, datasource_url, panelID })
    );
  };

  //border: "1px solid black"
  return (
    <Box sx={{ margin: "5px" }}>
      <Box component="div" sx={{}} overflow="hidden">
        DataSourceBlock
      </Box>

      <Box display="flex" alignItems="center">
        <Button
          disableRipple
          disableFocusRipple
          disableElevation
          sx={{
            color: "#5B9AFF",
            backgroundColor: "#181B1F",
            width: "10%",
            marginRight: "1rem",
            "&:hover": { backgroundColor: "#181B1F" },
          }}
          variant="contained"
        >
          URL
        </Button>
        <TextField
          error={fetchError ? true : false}
          sx={{ backgroundColor: "#141414" }}
          fullWidth
          inputRef={textRef}
          hiddenLabel
          id="filled-hidden-label-small"
          value={textValue}
          variant="filled"
          helperText={fetchErrorMessage ? `${fetchErrorMessage}` : ""}
          size="small"
          onChange={(e) => {
            setTextValue(e.target.value);
            const url = e.target.value;
            handleSetURL("link", url, panelID);
            if (url !== "http://localhost:5001/updates")
              fetchURl(variablesArray, textRef.current.value);
          }}
        />
        <Button
          variant="contained"
          style={{
            textTransform: "unset",
            marginLeft: "1rem",
          }}
          sx={{
            fontSize: { sm: "10px", lg: "14px" },
            padding: { sm: "0", lg: "0.5rem" },
            width: { sm: "5%", lg: "15%" },
          }}
          onClick={() => setDrawerOpen(true)}
        >
          Query inspector
        </Button>
      </Box>
      {variablesArray.length ? (
        <VariableAccordion
          fetchURl={fetchURl}
          panelID={panelID}
          setTextValue={setTextValue}
          handleSetURL={handleSetURL}
          textRef={textRef}
        />
      ) : (
        ""
      )}

      {/* <RealTimeChart /> */}

      <InspectDrawer
        panelID={panelID}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </Box>
  );
};

export default DataSourceBlock;
