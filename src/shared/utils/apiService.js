import axios from 'axios'
import { API_BASE_URL } from '../const'

const apiClientJson = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const apiClientMultipart = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const getUserQuestions = async (id) => {
  try {
    if (!id) throw new Error('You must provide user id')
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

export const updateQuestion = async (data) => {
  try {
    const response = await apiClientJson.post('/api/questions/update/', data)
    return response.data
  } catch (error) {
    console.error('Ошибка отправки вопроса:', error)
    throw error
  }
}

export const closeMessage = async (id, data) => {
  try {
    const response = await apiClientMultipart.post(
      `/api/questions/${id}/complete/`,
      data
    )
    return response.data
  } catch (error) {
    console.error('Ошибка отправки вопроса:', error)
    throw error
  }
}

export const getQuestionById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/questions/${id}`)
    return response.data
  } catch (error) {
    console.error('Ошибка получения копросов пользователя:', error)
    throw error
  }
}

export const getMessages = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/questions/${id}/messages/`
    )
    return response.data
  } catch (error) {
    console.error('Ошибка получения копросов пользователя:', error)
    throw error
  }
}
