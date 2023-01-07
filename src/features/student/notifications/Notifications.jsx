import { Table } from 'antd'
import React from 'react'
import { notificationApi } from '../../../api'
import { PageTitle } from '../../../components/page-title'
import { useFetchData } from '../../../hooks'

export const StudentNotifications = () => {
  const { isFetching, data } = useFetchData(notificationApi.getAllNotificationApi)

  const columns = [
    {
      title: 'Notification',
      dataIndex: 'data',
      key: 'data'
    }
  ]

  return (
    <div>
      <PageTitle title='Course Histories' />

      <Table
        columns={columns}
        dataSource={data}
        loading={isFetching}
        bordered
      />
    </div>
  )
}
