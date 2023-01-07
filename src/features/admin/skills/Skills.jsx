import { Button, notification, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { courseApi } from '../../../api'
import { useDrawerState } from '../../../hooks/useDrawerState'
import { FormSkill } from './Form'
import { PageTitle } from '../../../components/page-title'
import { useSkillsData } from './hooks'
import { FormAssignSkill } from './FormAssignSkill'

export const AdminManageSkills = () => {
  const [idSkill, setIdSkill] = useState(null)
  const { skills, isFetching, getSkills } = useSkillsData()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const drawerAddSkill = useDrawerState()
  const drawerAssignSkill = useDrawerState()

  const handleCreateSkillSubmit = async (values) => {
    try {
      setIsSubmitting(true)

      const { nameSkill, level, idManager } = values
      const { success } = await courseApi.createSkill({ nameSkill, level, idManager })

      if (!success) {
        throw new Error('Failed to create skill')
      }

      getSkills()

      notification.success({
        message: 'Create skill successfully'
      })
    } catch (error) {
      notification.error({
        message: 'Failed to create skill',
        description: error.message
      })
    } finally {
      drawerAddSkill.closeDrawer()
    }
  }

  const handleAssignSkillSubmit = async (values) => {
    try {
      const { idCourse } = values

      const { success } = await courseApi.assignSkill({ idCourse, idSkill })

      if (!success) {
        throw new Error('Failed to assign skill')
      }

      getSkills()

      notification.success({
        message: 'Assign skill successfully'
      })
    } catch (error) {
      notification.error({
        message: 'Failed to assign skill',
        description: error.message
      })
    } finally {
      drawerAssignSkill.closeDrawer()
    }
  }

  useEffect(() => {
    getSkills()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    {
      title: 'Name Skill',
      dataIndex: 'nameSkill',
      key: 'nameSkill'
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level'
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_) => (
        <Button
          onClick={() => {
            drawerAssignSkill.openDrawer()
            setIdSkill(_.idSkill)
          }}
        >
          Assign Skill
        </Button>
      )
    }
  ]

  return (
    <div>
      <PageTitle title='Manage Skills' renderRight={() => {
        return <Button type='primary' onClick={drawerAddSkill.openDrawer}>Create Skill</Button>
      }} />

      <Table columns={columns} dataSource={skills} loading={isFetching} bordered />

      <FormSkill
        visible={drawerAddSkill.isOpen}
        onClose={drawerAddSkill.closeDrawer}
        onSubmit={handleCreateSkillSubmit}
        isSubmitting={isSubmitting}
      />

      <FormAssignSkill
        visible={drawerAssignSkill.isOpen}
        onClose={drawerAssignSkill.closeDrawer}
        onSubmit={handleAssignSkillSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
