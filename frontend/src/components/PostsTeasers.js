import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { api_getAllPosts, api_getPostByCategory } from '../API-calls'
import { useSelector, useDispatch } from 'react-redux'
import { RECEIVE_POSTS, SORT_POSTS } from '../actions'

import Post from './Post'

export default function PostsTeasers({ match}) {

    const dispatch = useDispatch()
    const [sortBy, setSortBy] = useState('-')
    const [render, setRender] = useState(false)
    const posts = useSelector(state => state.posts)
  
    useEffect(() => {

        if(match.params.category){
            getCateryPosts()
        }else{
            getAllPosts()
        }
    }, [match])

    useEffect(() => {
        sortPosts()
    }, [sortBy])

    const sortPosts = () => {

        dispatch({ type: SORT_POSTS, sort: sortBy})
        setRender(!render)
    }

    const getCateryPosts = async () => {
        const posts = await api_getPostByCategory(match.params.category)
        dispatch({type: RECEIVE_POSTS, posts: posts})
    }

    const getAllPosts = async () => {
        const posts = await api_getAllPosts()
        dispatch({type: RECEIVE_POSTS, posts: posts})
    }
    
    return (
        <>
            <label>sort by:</label>
            <select className='dropdown' onChange={e => setSortBy(e.target.value)}>
                <option>-</option>
                <option value={'date'}>date</option>
                <option value={'score'}>score</option>
            </select>
            <ul className="posts-container">

                {posts ? 
                
                    posts.map(post => 

                        <Post key={post.id} post={post} id={post.id} />
                    )
                : 
                'there is no posts here'
                }

            </ul>
        </>
    )
}