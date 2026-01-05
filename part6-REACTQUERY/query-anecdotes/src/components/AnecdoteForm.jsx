import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createNewAncedoteMutation = useMutation({
    mutationFn: anecdoteService.createNewAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createNewAncedoteMutation.mutate({ content, votes: 0 })

    event.target.anecdote.value = ''
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
