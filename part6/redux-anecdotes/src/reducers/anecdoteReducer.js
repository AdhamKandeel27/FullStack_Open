import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      // action.payload should be { content, id, votes }
      state.push(action.payload);
    },
    vote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
    showContent(state, action) {
      const id = action.payload.id;
      const anecdote = state.find((a) => a.id === id);
      return anecdote;
    },
    setAnecdotes(state,action){
      return action.payload
    }
  },
});

export const { createAnecdote, vote , showContent, setAnecdotes} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
