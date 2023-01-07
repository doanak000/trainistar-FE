import { Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { courseApi } from '../../../api'
import { PageTitle } from '../../../components/page-title'
import { useFetchData } from '../../../hooks'
import { selectCurrentUser } from '../../auth/authSlice'

export const StudentHistories = () => {
  const currentUser = useSelector(selectCurrentUser)

  const { isFetching, data } = useFetchData(() => courseApi.getCourseHistories({ idStudent: currentUser.id ?? 166 }))

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'nameCourse',
      key: 'nameCourse',
      render: (text, { idCourse }) => <Link to={`/course/${idCourse}`}>{text}</Link>
    },
    {
      title: 'Mark',
      dataIndex: 'mark',
      key: 'mark'
    }
  ]


  return (
    <div>
      <PageTitle title='My Courses' />

      <Table
        columns={columns}
        dataSource={data}
        loading={isFetching}
        bordered
      />
    </div>
  )
}
