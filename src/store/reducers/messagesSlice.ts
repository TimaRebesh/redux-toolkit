import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

type MessageState = {
    id: number;
    body: string;
}

type InitState = {
    messages: MessageState[];
    status: null | string;
    error: null | string;
}

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments?_page=1');
            if (!response.ok)
                throw 'error on the server side'
            const data = await response.json();
            return data;
        } catch (text) {
            return rejectWithValue(text);
        }
    }
)

export const createNewMessage = createAsyncThunk(
    'messages/createNewMessage',
    async (message: string, { rejectWithValue, dispatch }) => {
        try {
            const newMes = { id: new Date().getTime(), body: message };
            const response = await fetch('https://jsonplaceholder.typicode.com/comments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify(newMes)
            })
            if (response.ok) {
               dispatch(newMessage(newMes))
            }
        } catch (e) {
        }
    }
)

export const deleteMessage = createAsyncThunk(
    'messages/deleteMessage',
    async (id: number, { rejectWithValue, dispatch }) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments/' + id, {
            method: 'DELETE',
        })
        if (response.ok) {
            dispatch(removeMessage(id));
        }
    }
)

const setLoading = (state:  WritableDraft<InitState>) => {
     state.status = 'loading' 
}

const initialState: InitState = {
    messages: [],
    status: null,
    error: null
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        newMessage(state, action: PayloadAction<MessageState>) {
            state.messages.push(action.payload);
            state.status = 'success';
        },
        removeMessage(state, action: PayloadAction<number>) {
            state.messages = state.messages.filter(m => m.id !== action.payload);
            state.status = 'success';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, setLoading)
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.status = 'success';
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(deleteMessage.pending, setLoading)
            .addCase(createNewMessage.pending, setLoading)
    },
})

export const { newMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
