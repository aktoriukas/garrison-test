import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Nav() {

    const categories = useSelector(state => state.categories)

    console.log(categories)

    return (
        <div>
            <Link to='/'>go to all posts</Link>

            {categories ? 
                categories.map(category => (
                    <Link key={category.path} to={`/${category.path}`}>{category.name}</Link>
                ))
            : 
            '-'
            }
        </div>
    )
}
