import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  dashboardName: "New dashboard",
  widgetArray:
    [
      {
        i: nanoid(),
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        panelName: "",
        data: [
          {
            dataName: "",
            datasource: null,
            datasource_url: null,
            dataType: null,
            dataDetail: null,
            fetchError: false,
            fetchErrorMessage: "",
          },
        ],
      },
    ] || [],
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    loadUploadDashboardName: (state, action) => {
      state.dashboardName = action.payload.dashboardName;
    },
    updateDashboardName: (state, action) => {
      state.dashboardName = action.payload;
    },
    fetchErrorShowBorder: (state, action) => {
      console.log(action);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.id
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );

      state.widgetArray[panelIndex].data[dataPanelId].fetchError =
        action.payload.res;
      state.widgetArray[panelIndex].data[dataPanelId].fetchErrorMessage =
        action.payload.message;
    },
    updateDataByURL: (state, action) => {
      console.log(action.payload);

      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.id
      );
      state.widgetArray[panelIndex].data.dataDetail = action.payload.result;
    },
    pasteVariableIntoDataSourceURL: (state, action) => {
      console.log("file: widgetSlice.js:129 ~ action:", action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data.datasource_url =
        action.payload.newDataSouceUrl;
    },
    fetchExistDashboard: (state, action) => {
      console.log(action.payload.data);
      state.widgetArray = action.payload.panelArray;
    },
    updateDataSourceWithURL: (state, action) => {
      //console.log("update URL~~~~~~~~~~", action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );

      state.widgetArray[panelIndex].data[dataPanelId].datasource_url =
        action.payload.datasource_url;
      state.widgetArray[panelIndex].data[dataPanelId].datasource =
        action.payload.datasourceName;
    },
    updatePanelName: (state, action) => {
      console.log(action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].panelName = action.payload.name;
    },
    loadUploadData: (state, action) => {
      //console.log(action.payload.widgetArray);
      state.widgetArray = action.payload.widgetArray;
    },
    updateDataType: (state, action) => {
      //console.log(action);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data.dataType = action.payload.selectedType;
    },
    updateData: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );

      state.widgetArray[panelIndex].data[dataPanelId].dataDetail =
        action.payload?.data;
    },
    addDataPanel: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data = [
        ...state.widgetArray[panelIndex].data,
        {
          dataName: "",
          datasource: null,
          datasource_url: null,
          dataType: null,
          dataDetail: null,
          fetchError: false,
          fetchErrorMessage: "",
        },
      ];
    },
    removeDataPanel: (state, action) => {
      console.log("Remove data panel~~", action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );

      state.widgetArray[panelIndex].data.splice(dataPanelId, 1);
    },
    modifyLayouts: (state, action) => {
      // const tempArray = state.widgetArray.map((widget) => ({
      //   ...widget,
      //   data: { ...widget.data },
      // }));
      const tempArray = [...state.widgetArray];
      // console.log("temp:", tempArray);
      //console.log(action);
      action.payload.layouts?.forEach((position) => {
        const widgetIndex = tempArray.findIndex(
          (widget) => widget.i === position.i
        );
        if (widgetIndex !== -1) {
          tempArray[Number(widgetIndex)].x = position.x;
          tempArray[Number(widgetIndex)].y = position.y;
          tempArray[Number(widgetIndex)].w = position.w;
          tempArray[Number(widgetIndex)].h = position.h;
        }
      });
      state.widgetArray = tempArray;
    },
    addWidget: (state) => {
      const panelNumber = state.widgetArray?.length;
      state.widgetArray = [
        ...state.widgetArray,
        {
          i: nanoid(),
          x: 0,
          y: -1.5 * panelNumber,
          w: 4,
          h: 2,
          panelName: "",
          data: [
            {
              dataName: nanoid(),
              datasource: null,
              datasource_url: null,
              dataType: null,
              dataDetail: null,
              fetchError: false,
              fetchErrorMessage: "",
            },
          ],
          fetchError: false,
          fetchErrorMessage: "",
        },
      ];
    },
    deleteWidget: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.id
      );
      const tempArray = [...state.widgetArray];
      tempArray.splice(panelIndex, 1);
      state.widgetArray = tempArray;
    },
    cleanUpAllPanel: (state, action) => {
      console.log(action);
      state.widgetArray = initialState;
    },
  },
});

export const {
  modifyLayouts,
  addWidget,
  deleteWidget,
  updateData,
  updateDataType,
  loadUploadData,
  updatePanelName,
  updateDataSourceWithURL,
  fetchExistDashboard,
  pasteVariableIntoDataSourceURL,
  updateDataByURL,
  fetchErrorShowBorder,
  cleanUpAllPanel,
  updateDashboardName,
  loadUploadDashboardName,
  addDataPanel,
  removeDataPanel,
} = widgetSlice.actions;
export const widgetReducer = widgetSlice.reducer;
