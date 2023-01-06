import { HomeOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons'
import { Menu, Modal } from 'antd'

import * as colors from '@ant-design/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { PATH_STUDENT, SIDEBAR, SIDEBAR_STUDENT } from '../../constants/common'
import { authActions, selectCurrentUser } from '../../features/auth/authSlice'
import { theme } from '../../theme/theme'
import { Avatar } from '../../components/avatar'

export const StudentLayout = ({ children }) => {
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
        <Link to={PATH_STUDENT.HOME}>
          <img src='/logo.svg' className='h-8' />
        </Link>
        <div className='border-l pl-4 relative top-0.5'>
          <span className='font-semibold text-primary-500'>Student</span>
        </div>

        <div className='flex-1' />

        <div className='flex items-center space-x-2'>
          <Avatar fullName={currentUser.fullName} size={32} />
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
              key: SIDEBAR_STUDENT.HOME,
              label: 'Home',
              icon: <HomeOutlined style={{ fontSize: theme.sizes.M }} />,
              onClick: () => {
                history.push(PATH_STUDENT.HOME)
              }
            },
            {
              key: SIDEBAR_STUDENT.SEARCH,
              label: 'Search',
              icon: <SearchOutlined style={{ fontSize: theme.sizes.M }} />,
              onClick: () => {
                history.push(PATH_STUDENT.SEARCH)
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

      <main className='pt-14 pl-64'>
        <div className='p-4'>
          {children}
        </div>
      </main>
    </React.Fragment>
  )
}
