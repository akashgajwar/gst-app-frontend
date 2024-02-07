import { getStorageItem } from '@/utils/localStorage'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getNotifications = async (id) => {
  try {
    const token = getStorageItem('token')
    const res = await axios.get(
      `${API_URL}/api/notifications?sort[0]=createdAt:asc&filters[users][0]=${id}&filters[viewed]=false&populate[users]=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateNotification = async (notificationId) => {
  try {
    const token = getStorageItem('token')
    const res = await axios.put(
      `${API_URL}/api/notifications/${notificationId}`,
      { data: { viewed: true } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return res.data
  } catch (error) {
    throw error
  }
}
