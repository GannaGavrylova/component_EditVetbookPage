import { useState, useEffect } from 'react'

export const useFetchData = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetchFunction()
        console.log(result)

        setData(result)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [...dependencies])

  return { data, isLoading, error }
}
