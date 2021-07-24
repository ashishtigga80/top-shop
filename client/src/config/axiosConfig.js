import axios from 'axios';

const app = axios.create({
    withCredentials: true
})

app.interceptors.response.use(
  response => (response), 
  error => (Promise.reject(error.response.data.err))
)

export default app;