const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('getAllAncedotes error')
  }
  return await response.json()
}

const createNewAnecdote = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  }
  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('createNewAnecdote error')
  }
  return await response.json()
}

const updateAnecdote = async (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  }
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote),
  }

  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)
  if (!response.ok) {
    throw new Error('updateAnecdote error')
  }
  return await response.json()
}

export default { getAllAnecdotes, createNewAnecdote, updateAnecdote }
