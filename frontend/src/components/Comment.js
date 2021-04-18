import React, {useState } from 'react'

import Vote from './Vote'

export default function Comment({comment, handleClick }) {

    const [edit, setEdit] = useState(false)
    const [body, setBody] = useState(comment.body)

    const updateComment = () => {
        handleClick('edit-save', 'comment', comment.id, Date.now(), body)
        setEdit(false)
    }

    return (
        <div className='comment'>
            {
                edit ?
                <>
                <input 
                    onChange={e => setBody(e.target.value)}
                    value={body} 
                    placeholder='post' />
                <button
                    onClick={updateComment}
                >save
                </button>

                </>
                :
                <h5>{comment.body}</h5>
            }

            <h6>{comment.author}</h6>

            <Vote id={comment.id} type='comment' handleClick={handleClick} score={comment.voteScore}/>

            <button onClick={() => setEdit(true)}>edit</button>
            <button onClick={() => handleClick('delete', 'comment', comment.id)}>delete</button>
        </div>
    )
}
