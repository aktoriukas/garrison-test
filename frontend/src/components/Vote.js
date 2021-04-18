import React from 'react'

export default function Vote({score, handleClick, className, type, id}) {
    return (
        <div className={`vote ${className}`}>

            <button onClick={() => handleClick('downVote', type, id)}>-</button>

            <span className='score'>{score}</span>

            <button onClick={() => handleClick('upVote', type, id)}>+</button>

        </div>
    )
}
