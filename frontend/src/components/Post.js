import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { 
    UPVOTE_POST,
    DOWNVOTE_POST,
    DELETE_POST,
    UPDATE_POST } from '../actions'
    
import { Link } from 'react-router-dom'
import { api_getComments } from '../API-calls'
import Vote from './Vote'

export default function Post({ post, id }) {

    useEffect(() => {
        getComments()
    }, [])

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)
    const [body, setBody] = useState(post.body)
    const [title, setTitle] = useState(post.title)
    const [commentsCount, setCommentsCount] = useState(0)

    const getComments = async () => {
        const comments = await api_getComments(id)
        setCommentsCount(comments.length)
    }

    const handleClick = (action) => {

        switch(action){
            case 'upVote':
                dispatch({type: UPVOTE_POST, id})
                break

            case 'downVote':
                dispatch({type: DOWNVOTE_POST, id})
                break

            case 'delete':
                dispatch({type: DELETE_POST, id})
                break

            case 'edit-save':
                dispatch({type: UPDATE_POST, id, title, body})
                setEdit(false)
            default:
                break
        }
    }

    return (
        <>
            {post.deleted === false ?
            
                <li>

                    {edit?
                        <div>
                            <input 
                                onChange={e => setBody(e.target.value)}
                                value={body} 
                                placeholder='post' />
                            <input 
                                onChange={e => setTitle(e.target.value)}
                                value={title} 
                                placeholder='title' />
                            <button
                                onClick={() => handleClick('edit-save')}
                            >save</button>
                        </div>
                        :
                        <h3>{post.title}</h3>
                    }
        
                    <div className='options'>
                        <Vote handleClick={handleClick} score={post.voteScore} />
            
                        <button onClick={() => handleClick('delete')}>delete</button>
                        <button onClick={() => setEdit(true)}>edit</button>
            
                        <div className='comments'>Comments: {commentsCount}</div>
                        <Link key={post.id} to={`/${post.category}/${post.id}`}>
                            read more
                        </Link>
                    </div>
                </li>
            :
            ''
            }
        </>

    )
}
