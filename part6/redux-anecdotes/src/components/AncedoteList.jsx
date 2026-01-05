import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  vote,
  showContent,
  initializeAnecdotes,
  incrementVote,
} from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AncedoteList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredList = anecdotes.filter((a) => a.content.includes(filter));
    return [...filteredList].sort((a, b) => b.votes - a.votes);
  });

  const addVote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(incrementVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 2));
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AncedoteList;
