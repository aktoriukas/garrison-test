import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { api_votePost, api_getSinglePost, api_getComments } from '../API-calls'

import { ADD_POST, 
    UPVOTE_POST,
    DOWNVOTE_POST,
    DELETE_POST,
    UPDATE_POST,
    RECEIVE_COMMENTS,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT} from '../actions'

import CommentForm from './CommentForm'
import Vote from './Vote'
import Comment from './Comment'

export default function FullPost( { match } ) {

    const dispatch = useDispatch()
    const id = match.params.id
    const posts = useSelector(state => state.posts)
    const comments = useSelector(state => state.comments)
    const [post, setPost] = useState([])
    const [title, setTitle] = useState(post.title)
    const [body, setBody] = useState(post.body)
    const [edit, setEdit] = useState(false)
    
    useEffect(() => {

        // if direct link - get single post, else use store
        if(posts.length > 0){
            posts.forEach(post => {
                if(post.id === id) {
                    setPost(post)
                    setBody(post.body)
                    setTitle(post.title)
                    return
                } 
            });
        }else{
            getSinglePost()
        }
        getComments()
    }, [])

    const getComments = async () => {
        const comments = await api_getComments(id)
        dispatch({type: RECEIVE_COMMENTS, comments })
    }

    const getSinglePost = async () => {
        const post = await api_getSinglePost(id)
        dispatch({type: ADD_POST, post })
        setPost(post)
        setBody(post.body)
        setTitle(post.title)
    }
    const handleClick = (action, type, commentID, timestamp, body) => {

        switch(action){
            case 'upVote':
                if(type === 'post') dispatch({type: UPVOTE_POST, id})
                if(type === 'comment') dispatch({type: UPVOTE_COMMENT, id: commentID})
                break

            case 'downVote':
                console.log(commentID)
                if(type === 'post') dispatch({type: DOWNVOTE_POST, id})
                if(type === 'comment') dispatch({type: DOWNVOTE_COMMENT, id: commentID})
                break

            case 'delete':
                if(type === 'post') dispatch({type: DELETE_POST, id})
                if(type === 'comment') dispatch({type: DELETE_COMMENT, id: commentID})
                break

            case 'edit-save':
                if(type === 'post') {
                    dispatch({type: UPDATE_POST, id, title, body})
                    setEdit(false)
                } 
                if(type === 'comment') {
                    dispatch({type: UPDATE_COMMENT, id: commentID, body, timestamp})
                }
                break

            default:
                break
        }
    }

    return (

            post.deleted === false ?
            
            <div className='post-container'>
    
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
                            onClick={() => handleClick('edit-save', 'post')}
                        >save
                        </button>
                    </div>
                    :
                    <>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <h6>{post.author}</h6>
                    </>
                }
    
                <div className='options'>
                    <Vote type='post' handleClick={handleClick} score={post.voteScore} />
        
                    <button onClick={() => handleClick('delete', 'post')}>delete</button>
                    <button onClick={() => setEdit(true)}>edit</button>
                </div>
    
                
                    {comments.map(comment => {
                        if(!comment.deleted) return (
                            <Comment 
                                handleClick={handleClick}
                                key={comment.id} 
                                comment={comment}/>
                        )
                        })}

                    <CommentForm 
                        deleted={post.deleted} 
                        parentId={id}/>

            </div>
            :
            ''
            
    )
}
