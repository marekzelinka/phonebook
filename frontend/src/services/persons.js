import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const personsService = {
  getAll: () => {
    return axios.get(baseUrl).then((res) => res.data)
  },
  create: (newObj) => {
    return axios.post(baseUrl, newObj).then((res) => res.data)
  },
}

export default personsService
