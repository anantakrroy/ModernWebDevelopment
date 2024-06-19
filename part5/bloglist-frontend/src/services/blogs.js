import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  try {
    const request = axios.get(baseUrl)
    return request.then((response) => {
      console.log(response.data)
      return response.data
    })
  } catch (error) {
    return error
  }
}

const create = (blog, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const request = axios.post(baseUrl, blog, { headers })
  return request.then((response) => response.data)
}

const update = (updatedBlog, id, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const request = axios.put(
    `${baseUrl}/${id}`,
    { ...updatedBlog },
    { headers }
  )
  return request.then((response) => response.data)
}

const remove = (blog, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const request = axios.delete(`${baseUrl}/${blog.id}`, { headers })
  return request.then((response) => response.data)
}

export default { getAll, create, update, remove }
