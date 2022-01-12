import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";


type MessageState = {
    id: number;
    body: string;
}

type InitState = {
    messages: MessageState[];
    status: null | string;
}

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_page=1');
        const data = await response.json();
        console.log(data)
        return data;
    }

)

const initialState: InitState = {
    messages: [],
    status: null,
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        newMessage(state, action: PayloadAction<string>) {
            state.messages.push({ id: new Date().getTime(), body: action.payload })
        },
        removeMessage(state, action: PayloadAction<number>) {
            state.messages = state.messages.filter(m => m.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.status = 'success';
                state.messages = action.payload;
            });
    },
})

export const { newMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
