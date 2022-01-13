import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tabNumber: 1
}

export const TabBarSlice = createSlice({
    name: 'tabbar',
    initialState,
    reducers: {
        changeTab: (state, action) => {
            state.tabNumber = action.payload
        }
    }
})

export const { changeTab } = TabBarSlice.actions;

export default TabBarSlice.reducer; 
