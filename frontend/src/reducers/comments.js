import  { 
    RECEIVE_COMMENTS,
    ADD_COMMENT,
    DOWNVOTE_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    UPVOTE_COMMENT } from "../actions";

import { api_voteComment, api_deleteComment, api_updateComment, api_addComment } from '../API-calls'


export default (state = [], action) => {

    const { comments, comment, type, id, body, timestamp, newComment } = action;
  
    switch(type) {

        // UPDATE COMMENTS ===========================================
  
        case RECEIVE_COMMENTS:
  
            return [ ...comments]
  
        case ADD_COMMENT:

            if(api_addComment(newComment)){
                
                return [...state, newComment]
            }


        // VOTE COMMENT ===============================================
  
        case DOWNVOTE_COMMENT:
            if(api_voteComment(id, 'downVote')){
                return state.map(comment => {
                    if( comment.id === id ) comment.voteScore--
                    return comment
                })
            }else {
                return state
            }

  
        case UPVOTE_COMMENT:
            if(api_voteComment(id, 'upVote')){
                return state.map(comment => {
                    if( comment.id === id ) comment.voteScore++
                    return comment
                })
            }else{
                return state
            }

        
        // EDIT COMMENT ================================================

        case DELETE_COMMENT:

            if(api_deleteComment(id)){
                return state.map(comment => {
                    if(comment.id === id){
                        comment.deleted = true
                    }
                    return comment
                })
            }else{
                return state
            }

        case UPDATE_COMMENT:

            if(api_updateComment(id, body, timestamp)){
                return state.map(comment => {
                    if(comment.id === id){
                        comment.body = body;
                        comment.timestamp = timestamp;
                    }
                    return comment
                })
            }

            return state

        default:
            return state
    }
  
  }
  