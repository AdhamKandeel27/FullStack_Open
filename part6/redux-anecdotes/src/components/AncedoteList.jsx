import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote, showContent } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

function AncedoteList() {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredList = anecdotes.filter((a) => a.content.includes(filter));
    return [...filteredList].sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const addVote = (id) => {
    console.log("vote", id);
    dispatch(vote(id));
    dispatch(
      showNotification(
        `you voted for ${anecdotes.find((a) => a.id === id).content}`
      )
    );
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AncedoteList;
