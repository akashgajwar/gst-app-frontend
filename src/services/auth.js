import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const signIn = async (values) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/local`, values)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}
