
import comments from './comments'
import posts from './posts'
import categories from './categories'

import { combineReducers } from "redux";

export default combineReducers({ posts, comments, categories });
