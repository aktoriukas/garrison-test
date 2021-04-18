import axios from 'axios'


const url = "http://localhost:3001";
const authorization = { Authorization: "garrison" }

export const api_getAllPosts = async () => {

    try{
        const params = {
            headers: authorization
        }
    
        const response = await axios.get(`${url}/posts`, params)
        return [...response.data]

    }catch (err) {console.log(err)}
} 

export const api_getCategories = async () => {
    try{
        const params = {
            headers: authorization
        }
        const response = await axios.get(`${url}/categories`, params)
        return [...response.data.categories]
    }catch (err) {console.log(err)}
}

export const api_getPostByCategory = async (category) => {
    try{
        const params = {
            headers: authorization
        }
        const response = await axios.get(`${url}/${category}/posts`, params)
        return [...response.data]
    }catch (err) {console.log(err)}
}

export const api_getSinglePost = async (id) => {

    try{
        const params = {
            headers: authorization
        }
    
        const response = await axios.get(`${url}/posts/${id}`, params)
        return response.data
    }
    catch (err) {console.log(err)}

}

export const api_getComments = async (id) => {

    try{
        const params = {
            headers: authorization
        }
        const response = await axios.get(`${url}/posts/${id}/comments`, params)
        return [...response.data]        
    }
    catch (err) { console.log(err) }

}

export const api_addComment = async ({id, timestamp, body, author, parentId}) => {

    try{
        const response = await axios({
            method: 'post',
            url:`${url}/comments`,
            headers: authorization,
            data: {
                id, 
                timestamp, 
                body, 
                author, 
                parentId}
        })
        console.log(response)
        return response

    }catch (err) {console.log(err)}
}

export const api_votePost = async (id, action) => {

    try{
        const response = await axios({
            method: 'post',
            url:`${url}/posts/${id}`,
            headers: authorization,
            data: { option: action }
        })
        return response

    }catch (err) {console.log(err)}
}

export const api_voteComment = async (id, action) => {

    try{
        const response = await axios({
            method: 'post',
            url:`${url}/comments/${id}`,
            headers: authorization,
            data: { option: action }
        })
        return response

    }catch (err) {console.log(err)}
}

export const api_deleteComment = async (id) => {

    try{
        const response = await axios({
            method: 'delete',
            url:`${url}/comments/${id}`,
            headers: authorization
        })
        return response

    }catch (err) {console.log(err)}
}

export const api_updateComment = async (id, body, timestamp) => {

    try{
        console.log(id)
        console.log(body)
        console.log(timestamp)
        const response = await axios({
            method: 'put',
            url:`${url}/comments/${id}`,
            headers: authorization,
            data:{body, timestamp}
        })
        console.log(response)
        return response

    }catch (err) {console.log(err)}
}

export const api_deletePost = async (id) => {

    try{
        const response = await axios({
            method: 'delete',
            url:`${url}/posts/${id}`,
            headers: authorization
        })
        return response

    }catch (err) {console.log(err)}
}

export const api_updatePost = async (id, title, body) => {

    try{
        const response = await axios({
            method: 'put',
            url: `${url}/posts/${id}`,
            headers: authorization,
            data: { title, body}
        })
        return response

    }catch (err) {console.log(err)}
}

export const api_addPost = async ( { id, timestamp, title, body, author, category } ) => {

    try{

        const response = await axios({
            method: 'post',
            url: `${url}/posts`,
            headers: authorization,
            data: {
                id,
                timestamp,
                title,
                body,
                author,
                category
            }
        })

    }catch (err) {console.log(err)}
}