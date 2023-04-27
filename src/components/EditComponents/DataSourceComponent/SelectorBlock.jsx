import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectorBlock({ panelID = { panelID } }) {
  const { dataDetail, dataKeys } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    console.log(
      "🚀 ~ file: DataTable.jsx:11 ~ const{dataDetail,dataKeys}=useSelector ~ targetPanel:",
      targetPanel
    );
    return {
      dataDetail: targetPanel[0]?.data.dataDetail,
      dataKeys: targetPanel[0]?.data.dataKeys,
    };
  });
  const stringKeys = dataKeys?.filter(
    (key) => typeof dataDetail[0][key] === "string"
  );
  const numberKeys = dataKeys?.filter(
    (key) => typeof dataDetail[0][key] === "number"
  );
  const [xKey, setXKey] = useState(stringKeys?.[0]); // selected x-axis key
  const [yKeys, setYKeys] = useState([numberKeys?.[0] || numberKeys?.[1]]); // array of selected y-axis keys

  // handle change in x-axis key selection
  const handleXKeyChange = (event) => {
    setXKey(event.target.value);
  };

  // handle change in y-axis key selection
  const handleYKeysChange = (event) => {
    const newSelectedYKeys = event.target.value;
    setYKeys(newSelectedYKeys);
  };

  return (
    <div>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="x-axis-select-label">X-Axis</InputLabel>
        <Select
          labelId="x-axis-select-label"
          id="x-axis-select"
          value={xKey}
          label="X-Axis"
          onChange={handleXKeyChange}
        >
          {stringKeys?.map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="y-axis-select-label">Y-Axis</InputLabel>
        <Select
          labelId="y-axis-select-label"
          id="y-axis-select"
          multiple
          value={yKeys}
          label="Y-Axis"
          onChange={handleYKeysChange}
        >
          {numberKeys?.map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* add Recharts component here using xKey and yKeys */}
    </div>
  );
}

export default SelectorBlock;
