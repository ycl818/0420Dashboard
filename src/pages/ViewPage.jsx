import { Box } from "@mui/material";
import GraphTypeSwitcher from "../components/GraphTypeSwitcher";
import { useSelector } from "react-redux";

const ViewPage = () => {
  const locationPath = window.location.href;
  const panelID = locationPath.split("/")[4];

  const { dataDetail, dataType } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);

    return {
      dataDetail: targetPanel[0]?.data?.dataDetail,
      dataType: targetPanel[0]?.data?.dataType,
    };
  });

  let keys = [];
  if (dataDetail) {
    keys = Object.keys(dataDetail[0]);
  }

  return (
    <Box style={{ height: "calc(100vh - 48px)" }}>
      {/* <Stack direction="row" spacing={2} justifyContent="space-between"> */}
      {/* <Sidebar /> */}
      <Box
        sx={{
          width: "90%",
          height: "80%",
          margin: "1rem 1rem 1rem 3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GraphTypeSwitcher
          type={dataType}
          data={dataDetail}
          width={500}
          height={300}
          dataKey={dataDetail ? keys[1] : "No Data"}
          XaxisName={dataDetail ? keys[0] : "No Data"}
        />
      </Box>
    </Box>
  );
};

export default ViewPage;
