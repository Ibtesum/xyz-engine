import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stepNumber: localStorage.getItem('stepNumber')
    ? parseInt(JSON.parse(localStorage.getItem('stepNumber')))
    : 1,
}

const stepSlice = createSlice({
    name: "stepp",
    initialState,
    reducers: {
        stepChange: (state) => {
            if(state.stepNumber ==1){
                state.stepNumber++;
                localStorage.setItem("stepNumber", state.stepNumber);
                
            }else{
                state.stepNumber--
                localStorage.setItem("stepNumber", state.stepNumber);
            }
        },
    },
});

export const { stepChange } = stepSlice.actions;
export default stepSlice.reducer;
