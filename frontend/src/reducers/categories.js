import  { GET_CATEGORIES } from "../actions";

export default (state = [], action) => {

    const { type, categories } = action;
  
    switch(type) {

        case GET_CATEGORIES:
            if(categories) return [...categories]
            return false

        default:
            return state
    }
  
  }
  