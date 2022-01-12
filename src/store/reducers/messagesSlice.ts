import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    messages: [
        {
            id: 1641984622829,
            text: 'test message'
        }
    ]
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        newMessage(state, action: PayloadAction<string>) {
            state.messages.push({ id: new Date().getTime(), text: action.payload })
        },
        removeMessage(state, action: PayloadAction<number>) {
            state.messages = state.messages.filter(m => m.id !== action.payload)
        }
    }
})

export const { newMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
