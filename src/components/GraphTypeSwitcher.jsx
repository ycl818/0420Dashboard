import React from "react";
import { ChartTypeSwitcher } from "../ChartTypeSwitcher";

const GraphTypeSwitcher = ({
  type,
  data,
  width,
  height,
  XaxisName,
  dataKey,
  panelID,
}) => {
  return (
    <ChartTypeSwitcher
      type={type}
      data={data}
      width={width}
      height={height}
      XaxisName={XaxisName}
      dataKey={dataKey}
      panelID={panelID}
    />
  );
};

export default GraphTypeSwitcher;
