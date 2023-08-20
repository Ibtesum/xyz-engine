import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: localStorage.getItem('chartData') ? JSON.parse(localStorage.getItem('chartData')) : null,
};

const chartSlice = createSlice({
    name: "chartData",
    initialState,
    reducers: {
        putChartData: (state, actions) => {
            state.data = actions.payload;
            localStorage.setItem("chartData", JSON.stringify(actions.payload));
        },
        clearChartData: (state, ) => {
            state.data = null;
            localStorage.clear();
        }
        
    },
});

export const { putChartData, clearChartData } = chartSlice.actions;
export default chartSlice.reducer;
