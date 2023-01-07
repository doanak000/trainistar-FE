import { PDFViewer } from '@react-pdf/renderer'
import { Button, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { courseApi } from '../../../api'
import { Certificate } from '../../../components/certificate'
import { PageTitle } from '../../../components/page-title'
import { useDrawerState, useFetchData } from '../../../hooks'
import { selectCurrentUser } from '../../auth/authSlice'

export const StudentCertificates = () => {
  const currentUser = useSelector(selectCurrentUser)

  const { isFetching, data } = useFetchData(() => courseApi.getCertificates({ idStudent: currentUser.id }))
  const { isOpen, openDrawer, closeDrawer } = useDrawerState()
  const [cert, setCert] = useState(null)

  const columns = [
    {
      title: 'Certificate Name',
      dataIndex: 'nameCertificate',
      key: 'nameCertificate'
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Button
          onClick={() => {
            setCert(record)
            openDrawer()
          }}
        >
          Get My Certificate
        </Button>
      )
    }
  ]

  return (
    <div>
      <PageTitle title='My Certificates' />

      <Table
        columns={columns}
        dataSource={data}
        loading={isFetching}
        bordered
      />

      <Modal title={cert?.nameCertificate} open={isOpen} onCancel={closeDrawer} width='90vw' centered style={{ top: 0 }}>
        <PDFViewer style={{ width: '100%', minHeight: 'calc(80vh)' }}>
          {cert && <Certificate fullName={`${cert.firstName} ${cert.lastName}`} certName={cert?.nameCertificate} />}
        </PDFViewer>
      </Modal>
    </div>
  )
}
