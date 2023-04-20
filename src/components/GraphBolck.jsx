import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import ChartNameField from "./EditComponents/ChartNameField";
import GraphTypeSwitcher from "./GraphTypeSwitcher";

const GraphBolck = ({ panelID }) => {
  const { dataDetail, dataType } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);

    return {
      dataDetail: targetPanel[0]?.data?.dataDetail,
      dataType: targetPanel[0]?.data?.dataType,
    };
  });

  let keysArry = [];
  if (dataDetail && Array.isArray(dataDetail) && dataDetail.length > 0) {
    keysArry = Object.keys(dataDetail[0]);
    console.log(keysArry);
  }
  return (
    <>
      <Box
        component="div"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
        p={5}
        m={2}
      >
        <ChartNameField panelID={panelID} />
        <GraphTypeSwitcher
          type={dataType}
          data={dataDetail}
          width={500}
          height={300}
          dataKey={keysArry[1] || "name"}
          XaxisName={keysArry[0] || "hi"}
          panelID={panelID}
        />
      </Box>
    </>
  );
};

export default GraphBolck;
