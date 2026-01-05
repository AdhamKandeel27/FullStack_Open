import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote, appendAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdoteService.js";

function AncedoteForm() {
  const dispatch = useDispatch();

  const handleAddAncedote = async (e) => {
    e.preventDefault();
    const content = e.target.ancedote.value;
    console.log(content);
    dispatch(appendAnecdote({ content, votes: 0 }));
    e.target.ancedote.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAncedote}>
        <div>
          <input type="text" name="ancedote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AncedoteForm;
