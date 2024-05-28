import axios from 'axios'

const baseUrl = '/api/login'
const login = async({username, password}) => await axios.post(baseUrl, {username, password})

export default {login}