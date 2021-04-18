import { 
    RECEIVE_POSTS, 
    ADD_POST,
    UPVOTE_POST,
    DELETE_POST,
    UPDATE_POST,
    DOWNVOTE_POST,
    SORT_POSTS } from "../actions";
  
import { api_votePost, api_deletePost, api_updatePost, api_addPost } from '../API-calls'

export default (state = [], action) => {

    const { posts, type, post, id, title, body, sort } = action;
  
    switch (type) {

        // UPDATE POSTS ===========================================
  
        case RECEIVE_POSTS:
            if(posts) return [ ...posts ];
            return false
  
        case ADD_POST:
            if(api_addPost(post)){
                return [...state, post]
            }else {
                return state
            }

        // SORT POSTS ===========================================

        case SORT_POSTS:

            switch(sort){
                case '-':
                    return state
                case 'score':
                    state.sort((a,b) => {
                        if(a.voteScore < b.voteScore) return 1
                        if(a.voteScore > b.voteScore) return -1
                        return 0
                    })
                    return state

                case 'date':
                    state.sort((a,b) => {
                        if(a.timestamp < b.timestamp) return 1
                        if(a.timestamp > b.timestamp) return -1
                        return 0
                    })

                default:
                    return state
            }

        // VOTE POST ===============================================

        case DOWNVOTE_POST:

            if(api_votePost(id, 'downVote')){
                return state.map(post => {
                    if( post.id === id ) post.voteScore--
                    return post
                })
            }else{
                return state
            }

    
        case UPVOTE_POST:

            if(api_votePost(id, 'upVote')){
                return state.map(post => {
                    if( post.id === id ) post.voteScore++
                    return post
                })
            }else{
                return state
            }


        // EDIT POST ================================================

        case DELETE_POST:

            if(api_deletePost(id)){
                return state.map(post => {
                    if(post.id === id){
                        post.deleted = true
                    }
                    return post
                })
            }else{
                return state
            }

    
        case UPDATE_POST:

            if(api_updatePost(id, title, body)){
                return state.map(post => {
                    if(post.id === id){
                        post.body = body;
                        post.title = title;
                    }
                    return post
                })
            }

            return state
  
        default:
            return state;
    }
  };
  