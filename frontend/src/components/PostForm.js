import React, {useState} from 'react'
import uniqid from 'uniqid'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_POST } from '../actions'

export default function PostForm({ url }) {

    const [title, setTitle] = useState('')
    const [post, setPost] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories)

    const submitForm = async (e) => {
        e.preventDefault()

        const timestamp = Date.now()
        const newPost = {
            id: uniqid(),
            timestamp,
            author: name,
            body: post,
            title,
            deleted: false,
            voteScore: 0,
            category
        }
        dispatch({type: ADD_POST, post: newPost})

    }

    return (

        <form onSubmit={submitForm}>
            <input 
                onChange={e => setTitle(e.target.value)}
                type='text' 
                name='title' 
                placeholder='title'/>

            <input 
                onChange={e => setPost(e.target.value)}
                type='text' 
                name='post' 
                placeholder='post'/>

            <input 
                onChange={e => setName(e.target.value)}
                type='text' 
                name='name' 
                placeholder='name'/>

            <select 
                name='categories'
                onChange={e => setCategory(e.target.value)}
            >
                {categories ? 
                    categories.map(category => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ))
                : 
                '-'}
            </select>

            <input 
                type='submit'/>            
        </form>
    )
}
