import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer.js";
import filterReducer from "./reducers/filterReducer.js";
import notificationReducer from "./reducers/notificationReducer.js";

//states: anecdotes=[...] , filter='', notification= ''

const store = configureStore({
  reducer: {
    //reducers
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
