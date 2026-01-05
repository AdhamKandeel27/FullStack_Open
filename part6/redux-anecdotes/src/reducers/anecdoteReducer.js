import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

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
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateAnecdote(state, action) {
      const updated = action.payload;
      return state.map((a) => (a.id !== updated.id ? a : updated));
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    //ASYNC LOGIC
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (newAnecdote) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.createNew(newAnecdote);
    dispatch(createAnecdote(createdAnecdote));
  };
};

export const incrementVote = (newAnecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(newAnecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export const { createAnecdote, vote, showContent, setAnecdotes, updateAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
