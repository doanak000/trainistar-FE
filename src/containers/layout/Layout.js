import React, { useEffect, useState } from 'react'
import { Avatar, Layout } from 'antd'
import {
  // MenuUnfoldOutlined,
  // MenuFoldOutlined,
  BookOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
  HomeOutlined
} from '@ant-design/icons'
import {
  CustomContent,
  CustomHeader,
  CustomMenu,
  CustomMenuItem,
  CustomSider,
  DisplayName,
  Logo,
  TabName,
  UserInfo
} from './Layout.style'
import { theme } from '../../theme/theme'
import { confirm } from '../../components/ConfirmModal/ConfirmModal'
import { PATH, SIDEBAR } from '../../constants/common'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions, selectCurrentUser } from '../../features/auth/authSlice'
import { selectTranslation } from '../../features/language/languageSlice'

const LayoutAdmin = ({ children }) => {
  const dispatch = useDispatch()

  const [selectedKey, setSelectedKey] = useState(SIDEBAR.LISTCOURSEPAGE)

  const location = useLocation()
  const translation = useSelector(selectTranslation)
  const [tabName, setTabName] = useState(translation.TAB_LISTCOURSEPAGE)

  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    setSelectedKey(location.pathname)
  }, [location.pathname])

  const selectTabName = (tabName) => {
    setTabName(tabName)
  }

  const logoutHandler = () => {
    confirm({
      content: translation.CONFIRM_LOGOUT,
      onOk: () => {
        dispatch(authActions.logout())
      }
    })
  }

  return (
    <Layout>
      <CustomSider
        width={theme.sideBarWidth}
      >
        <Logo>Trainistar</Logo>

        <CustomMenu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          onSelect={({ key }) => {
            key !== SIDEBAR.LOGOUT && setSelectedKey(key)
          }}
        >
          <CustomMenuItem
            key={SIDEBAR.HOME}
            icon={<HomeOutlined style={{ fontSize: theme.sizes.M }} />}
          >
            <Link
              to={PATH.HOME}
              onClick={() => selectTabName('HOME')}
            >
              HOME
            </Link>
          </CustomMenuItem>
          <CustomMenuItem
            key={SIDEBAR.LISTCOURSEPAGE}
            icon={<BookOutlined style={{ fontSize: theme.sizes.M }} />}
          >
            <Link
              to={PATH.LISTCOURSEPAGE}
              onClick={() => selectTabName(translation.TAB_LISTCOURSEPAGE)}
            >
              LIST COURSE
            </Link>
          </CustomMenuItem>
          <CustomMenuItem
            key={SIDEBAR.USER}
            icon={<UserOutlined style={{ fontSize: theme.sizes.M }} />}
          >
            <Link
              to={PATH.USER}
              onClick={() => selectTabName(translation.TAB_LISTCOURSEPAGE)}
            >
              MANAGE USER
            </Link>
          </CustomMenuItem>
          <CustomMenuItem
            key={SIDEBAR.NOTI}
            icon={<VideoCameraOutlined style={{ fontSize: theme.sizes.M }} />}
          >
            <Link
              to={PATH.NOTI}
              onClick={() => selectTabName('NOTIFICATION')}
            >
              NOTIFICATION
            </Link>
          </CustomMenuItem>
          <CustomMenuItem
            key={SIDEBAR.VIDEO}
            icon={<UploadOutlined style={{ fontSize: theme.sizes.M }} />}
          >
            <Link
              to={PATH.VIDEO}
              onClick={() => selectTabName(translation.TAB_VIDEO)}
            >
              {translation.TAB_VIDEO}
            </Link>
          </CustomMenuItem>
          <CustomMenuItem
            key={SIDEBAR.LOGOUT}
            icon={<LogoutOutlined style={{ fontSize: theme.sizes.M }} />}
            onClick={logoutHandler}
            danger
            selectable='false'
            style={{
              marginTop: theme.spaces.twenty * 3,
              alignSelf: 'flex-end'
            }}
          >
            {translation.TEXT_LOGOUT}
          </CustomMenuItem>
        </CustomMenu>
      </CustomSider>

      <Layout className='site-layout'>
        <CustomHeader>
          <TabName>{tabName}</TabName>
          <UserInfo>
            <Avatar
              size='default'
              icon={<UserOutlined />}
              style={{ backgroundColor: theme.colors.primary }}
            />
            <DisplayName>{currentUser.fullName}</DisplayName>
          </UserInfo>
        </CustomHeader>
        <CustomContent>{children}</CustomContent>
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
