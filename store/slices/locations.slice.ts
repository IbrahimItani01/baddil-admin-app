import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Location {
	id: string;
	name: string;
	created_at: Date;
	updated_at: Date;
	longitude: number;
	latitude: number;
}

export interface LocationsState {
	locations: Location[];
	
}

const initialState: LocationsState = {
	locations: [],
	
};

const locationsSlice = createSlice({
	name: "locations",
	initialState,
	reducers: {
		setLocations: (state, action: PayloadAction<Location[]>) => {
			state.locations = action.payload;
		},

		addLocation: (state, action: PayloadAction<Location>) => {
			state.locations.push(action.payload);
		},
	
	},
});

export const { setLocations, addLocation } =
	locationsSlice.actions;

export default locationsSlice.reducer;
