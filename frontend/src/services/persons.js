import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const personsService = {
  create: (newObj) => {
    return axios.post(baseUrl, newObj).then((res) => res.data)
  },
  getAll: () => {
    return axios.get(baseUrl).then((res) => res.data)
  },
  update: (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj).then((res) => res.data)
  },
  delete: (id) => {
    return axios.delete(`${baseUrl}/${id}`).then((res) => res.data)
  },
}

export default personsService
