import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch , Route, Link } from 'react-router-dom'

import PostsTeasers from './components/PostsTeasers'
import FullPost from './components/FullPost'
import PostForm from './components/PostForm'
import Nav from './components/Nav'

import { api_getCategories } from './API-calls'
import { GET_CATEGORIES } from './actions'
import { useDispatch } from 'react-redux' 

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    getCategories()
  }, [])

  const getCategories = async () => {
    const categories = await api_getCategories()
    dispatch({type: GET_CATEGORIES, categories })
  }

  return (
    <Router>
      <div className="App">

        <PostForm path='/' />

        <Nav />

        <Switch>
          
            <Route path='/' exact component={PostsTeasers} />

            <Route path='/:category/:id' exact component={FullPost} />

            <Route path='/:category/' exact component={PostsTeasers} />

            <Route />

        </Switch>

      </div>
    </Router>
  )
}
