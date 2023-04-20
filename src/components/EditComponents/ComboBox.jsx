import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ChartContext } from "../../store/chartStore";
import { useDispatch } from "react-redux";
import { updateDataType } from "../../store";

const ComboBox = ({ panelID }) => {
  const charts = [
    "Line Chart",
    "Bar Chart",
    "Area Chart",
    "Pie Chart",
    "Time Series",
  ];
  const [chartState, dispatch] = useContext(ChartContext);
  console.log(chartState);

  const dispatch1 = useDispatch();

  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      options={charts}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label="Charts" />}
      onChange={(e) => {
        console.log(typeof e.target.textContent);
        // dispatch({
        //   type: "CHANGE_CHART_TYPE",
        //   payload: e.target.textContent,
        // });
        const selectedType = e.target.textContent;
        console.log(
          "file: ComboBox.jsx:35 ~ ComboBox ~ selectedType:",
          selectedType
        );

        dispatch1(updateDataType({ selectedType, panelID }));
      }}
    />
  );
};

export default ComboBox;
