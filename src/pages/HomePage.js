import React, { useEffect, useState } from 'react'
import Login from '../features/auth/Login'
import { sampleApi } from '../api'
import { Spin } from 'antd'

const Activity = ({ activity }) => {
  return (
    <div>
      <code>{JSON.stringify(activity)}</code>
    </div>
  )
}

const HomePage = () => {
  const [activity, setActivity] = useState(null)
  const [isFetching, setIsFetching] = useState(true) // Init Loading State

  const fetchData = async () => {
    try {
      const { success, data } = await sampleApi.getActivity()

      if (!success) {
        throw new Error(data)
      }

      // Handle Success
      console.log('Success', data)
      setActivity(data)

    } catch (error) {
      // Handle Error
      console.error('Error', error.message)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>HomePage</h1>
      <div>
        {isFetching ? <Spin /> : <Activity activity={activity} />}
      </div>
    </div>
  )
}

export default HomePage
