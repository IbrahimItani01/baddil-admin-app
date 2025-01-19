import { createSlice } from "@reduxjs/toolkit";

export interface Location {
	name: string;
	latitude: number;
	longitude: number;
}

export interface Meetup {
	location: Location;
}

export interface User {
	email: string;
}

export interface Barter {
	id: string;
	user1: User;
	user2: User;
	meetup: Meetup;
	created_at: Date;
}

export interface BartersState {
	bartersData: Barter[];
	locations: Record<string, Location>;
}

const initialState: BartersState = {
	bartersData: [],
	locations: {},
};

const bartersSlice = createSlice({
	name: "barters",
	initialState,
	reducers: {
		setBartersData(state, action: { payload: Barter[] }) {
			state.bartersData = action.payload;
		},

		setLocationsData(state, action: { payload: Record<string, Location> }) {
			state.locations = action.payload;
		},

		addBarter(state, action: { payload: Barter }) {
			const newBarter = action.payload;
			state.bartersData.push(newBarter);
			if (newBarter.meetup?.location) {
				const { name, latitude, longitude } = newBarter.meetup.location;
				state.locations[name] = { name, latitude, longitude };
			}
		},

		deleteBarter(state, action: { payload: string }) {
			const barterId = action.payload;
			state.bartersData = state.bartersData.filter(
				(barter) => barter.id !== barterId
			);
			state.locations = state.bartersData.reduce((acc, barter) => {
				if (barter.meetup?.location) {
					const { name, latitude, longitude } = barter.meetup.location;
					acc[name] = { name, latitude, longitude };
				}
				return acc;
			}, {} as Record<string, Location>);
		},

		updateLocation(state, action: { payload: Location }) {
			const { name } = action.payload;
			if (state.locations[name]) {
				state.locations[name] = action.payload;
			}
		},
	},
});

export const {
	setBartersData,
	setLocationsData,
	addBarter,
	deleteBarter,
	updateLocation,
} = bartersSlice.actions;

export default bartersSlice.reducer;
