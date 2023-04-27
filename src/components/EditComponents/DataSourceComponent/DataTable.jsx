import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const DataTable = ({ panelID }) => {
  console.log("🚀 ~ file: DataTable.jsx:7 ~ DataTable ~ panelID:", panelID);
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
  console.log(
    "🚀 ~ file: DataTable.jsx:16 ~ const{dataDetail,dataKeys}=useSelector ~ dataDetail:",
    dataDetail
  );
  console.log(
    "🚀 ~ file: DataTable.jsx:15 ~ const{dataDetail,dataKeys}=useSelector ~ dataKeys:",
    dataKeys
  );

  const rows = dataDetail?.length
    ? dataDetail.map((row, index) => ({ ...row, id: index }))
    : [];

  const columns =
    dataKeys?.map((key) => ({
      field: key,
      headerName: key,
      flex: 1,
    })) || [];

  return (
    <div style={{ height: 400, width: 500 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
