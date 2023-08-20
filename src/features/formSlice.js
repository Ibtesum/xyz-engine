import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstForm:  localStorage.getItem('firstForm') ? JSON.parse(localStorage.getItem('firstForm')) : null,
    secondForm: localStorage.getItem('secondForm') ? JSON.parse(localStorage.getItem('secondForm')) : null,
};

const formSlice = createSlice({
    name: "stepp",
    initialState,
    reducers: {
        putFirstFormData: (state, actions) => {
            state.firstForm = actions.payload;
            localStorage.setItem("firstForm", JSON.stringify(state.firstForm));
        },
        putSecondFormData: (state, actions) => {
            state.secondForm = actions.payload;
            localStorage.setItem("secondForm", JSON.stringify(state.secondForm));

        },
        clearAllFormData: (state) => {
            state.firstForm = null;
            state.secondForm = null;
            localStorage.clear();
        }
    },
});

export const { putFirstFormData, putSecondFormData, clearAllFormData} = formSlice.actions;
export default formSlice.reducer;
