import { BellOutlined, BookOutlined, HomeOutlined, LogoutOutlined, UserOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, Menu, Modal } from 'antd'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { PATH, SIDEBAR } from '../../constants/common'
import { authActions, selectCurrentUser } from '../../features/auth/authSlice'
import { theme } from '../../theme/theme'
import * as colors from '@ant-design/colors'

export const AdminLayout = ({ children }) => {
  const dispatch = useDispatch()

  const [selectedKey, setSelectedKey] = useState(SIDEBAR.LISTCOURSEPAGE)

  const location = useLocation()
  const history = useHistory()

  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    setSelectedKey(location.pathname)
  }, [location.pathname])

  const handleLogoutClick = () => {
    Modal.confirm({
      content: 'Are you sure you want to logout?',
      centered: true,
      onOk: () => {
        dispatch(authActions.logout())
      }
    })
  }

  return (
    <React.Fragment>
      <header className='fixed top-0 w-full flex items-center h-14 bg-white border-b shadow-sm px-4 space-x-4 z-20'>
        <img src='/logo.svg' className='h-8' />
        <div className='border-l pl-4 relative top-0.5'>
          <span className='font-semibold text-primary-500'>Admin</span>
        </div>

        <div className='flex-1' />

        <div className='flex items-center space-x-2'>
          <Avatar
            size='default'
            icon={<UserOutlined />}
            className='flex items-center justify-center bg-primary-500'
          />
          <span className='font-semibold'>{currentUser.fullName}</span>
        </div>
      </header>

      <aside className='w-64 border-r bg-white fixed top-14 z-10 shadow-sm' style={{ height: 'calc(100vh - 56px)' }}>
        <Menu
          theme='light'
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          onSelect={({ key }) => {
            key !== SIDEBAR.LOGOUT && setSelectedKey(key)
          }}
          style={{ border: 0 }}
          items={[
            {
              key: SIDEBAR.HOME,
              label: 'Home',
              icon: <HomeOutlined style={{ fontSize: theme.sizes.M }} />,
              onClick: () => {
                history.push(PATH.HOME)
              }
            },
            {
              key: SIDEBAR.LISTCOURSEPAGE,
              label: 'Courses',
              icon: <BookOutlined style={{ fontSize: theme.sizes.M }} />,
              onClick: () => {
                history.push(PATH.LISTCOURSEPAGE)
              }
            },
            {
              key: SIDEBAR.SKILLS,
              label: 'Skills',
              icon: <StarOutlined style={{ fontSize: theme.sizes.M }} />,
              onClick: () => {
                history.push(PATH.SKILLS)
              }
            },
            {
              key: SIDEBAR.USER,
              label: 'Users',
              icon: <UserOutlined style={{ fontSize: theme.sizes.M }} />,
              onClick: () => {
                history.push(PATH.USER)
              }
            },
            {
              key: SIDEBAR.NOTI,
              label: 'Notifications',
              icon: <BellOutlined style={{ fontSize: theme.sizes.M }} />,
              onClick: () => {
                history.push(PATH.NOTI)
              }
            },
            {
              key: SIDEBAR.LOGOUT,
              label: 'Logout',
              icon: <LogoutOutlined style={{ fontSize: theme.sizes.M }} />,
              style: { color: colors.red[4] },
              onClick: handleLogoutClick
            }
          ]}
        />
      </aside>

      <main className='mt-14 ml-64 p-4'>
        {children}
      </main>
    </React.Fragment>
  )
}
