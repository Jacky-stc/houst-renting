'use client'
import { createSlice } from "@reduxjs/toolkit";

export interface SearchState{
    searchNumber: string
}

const initialState: SearchState = {
    searchNumber: 'test'
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers:{
        changeSearchNumber: (state, action)=>{
            state.searchNumber = action.payload
        }
    }
})

export const { changeSearchNumber } = searchSlice.actions
export default searchSlice.reducer