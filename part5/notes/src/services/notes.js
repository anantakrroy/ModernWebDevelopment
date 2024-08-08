import axios from 'axios'

const baseUrl = '/api/notes'

let token = null

const setToken = (newToken) => {
  console.log('setToken inside note service called .....')
  token = `Bearer ${newToken}`
  console.log('token inside note service set to >>> ', token);
  
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  console.log('Create service method hit .....')
  console.log(`TOKEN >>> ${token}`)
  const config = {
    headers: { Authorization: token },
  }
  console.log('Is config header set correctly ? ' , JSON.stringify(config))
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  setToken,
}
