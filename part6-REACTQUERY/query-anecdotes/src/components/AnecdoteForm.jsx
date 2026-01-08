import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdoteService'
import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notification, notificationDispatch } = useContext(NotificationContext)

  const createNewAncedoteMutation = useMutation({
    mutationFn: anecdoteService.createNewAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createNewAncedoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'ADDING', payload: content })

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
