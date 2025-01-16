import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SystemState {
}

const initialState: SystemState = {
	
};

const systemSlice = createSlice({
	name: "system",
	initialState,
	reducers: {
		
	},
});

export const {  } = systemSlice.actions;
export default systemSlice.reducer;
