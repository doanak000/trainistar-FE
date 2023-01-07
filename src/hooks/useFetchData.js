import { useEffect, useState } from 'react'

export const useFetchData = (api, shouldInit = true) => {
  const [data, setData] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  const fetchData = async () => {
    try {
      setIsFetching(true)

      const { success, data } = await api()
      if (!success) {
        throw new Error(data)
      }
      // Handle Success
      setData(data)

    } catch (error) {
      // Handle Error
      console.error('Error', error?.message)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    if (shouldInit) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, isFetching, fetchData }
}
