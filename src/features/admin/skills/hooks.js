import { notification } from 'antd'
import { useState } from 'react'
import { courseApi } from '../../../api'

export const useSkillsData = () => {
  const [skills, setSkills] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const getSkills = async () => {
    try {
      setIsFetching(true)
      const { success, data } = await courseApi.getSkills()
      if (!success) {
        throw new Error('Failed to get skills')
      }
      setSkills(data)
    } catch (error) {
      notification.error({
        message: 'Failed to get skills',
        description: error.message
      })
      setSkills([])
    } finally {
      setIsFetching(false)
    }
  }

  return {
    skills,
    isFetching,
    getSkills
  }
}
