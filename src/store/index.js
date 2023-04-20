import { configureStore } from "@reduxjs/toolkit";
import {
  addMetric,
  removeMetric,
  selectMetric,
  deselectMetric,
  updateTimeRange,
} from "./slice/dashboardSlice";
import { widgetReducer } from "./slice/widgetSlice";
import { widgetApi } from "./api/widgetApi";
import { variableReducer } from "./slice/variableSlice";

export const store = configureStore({
  reducer: {
    widget: widgetReducer,
    variable: variableReducer,
    [widgetApi.reducerPath]: widgetApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(widgetApi.middleware);
  },
});

window.store = store;

export {
  addMetric,
  removeMetric,
  selectMetric,
  deselectMetric,
  updateTimeRange,
};

export * from "./slice/variableSlice";
export * from "./slice/widgetSlice";
export { useFetchWidgetDataQuery } from "./api/widgetApi";
