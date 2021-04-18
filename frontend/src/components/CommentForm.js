import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { ADD_COMMENT } from '../actions'
import uniqid from 'uniqid'
import { api_addComment } from '../API-calls'

export default function CommentForm({ parentId }) {
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('')
    const dispatch = useDispatch()

    const submitForm = async (e) => {
        e.preventDefault()


        const timestamp = Date.now()
        const newComment = {
            id: uniqid(),
            timestamp,
            parentId,
            body,
            author,
            voteScore: 0,
            deleted: false,
            parentDeleted: false
        }

        dispatch({type: ADD_COMMENT, newComment})

    }

    return (

        <form className='comment-form' onSubmit={submitForm}>
            <input 
                onChange={e => setBody(e.target.value)}
                type='text' 
                name='comment' 
                placeholder='comment'/>

            <input 
                onChange={e => setAuthor(e.target.value)}
                type='text' 
                name='name' 
                placeholder='name'/>

            <input 
                type='submit'/>            
        </form>
    )

}
