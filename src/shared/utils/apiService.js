import axios from 'axios'
import { API_BASE_URL } from '../const'

// Создаем экземпляр axios с базовыми настройками для формата Json
// const apiClientJson = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

const apiClientMultipart = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const getUserQuestions = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/questions/get/?user_id=${id}`
    )
    return response.data
  } catch (error) {
    console.error('Ошибка получения копросов пользователя:', error)
    throw error
  }
}

export const addQuestion = async (data) => {
  try {
    const response = await apiClientMultipart.post('/api/questions/add/', data)
    return response.data
  } catch (error) {
    console.error('Ошибка отправки вопроса:', error)
    throw error
  }
}
