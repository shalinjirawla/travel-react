import React, { useContext, useEffect, useState } from 'react';
import {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, ConfigProvider, Dropdown, Modal, message } from 'antd';
import logo from './images/logo.png';
import MainRoutes from './Routes';
import { AuthContext } from './context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './styles/navbar.css';
import AppButton from './components/AppButton';
import Login from './pages/Login';
import AppModal from './components/AppModal';
import CIcon from '@coreui/icons-react';
import { cilFlightTakeoff } from '@coreui/icons';
import { BsAirplaneFill, BsBuilding, BsBusFrontFill, BsFillLuggageFill, BsFillTrainFrontFill } from "react-icons/bs";
import AppFooter from './pages/Footer';

const Layouts = () => {

    const { userId, user, setUser, setUserId, currUserData, isDesktop, isMobile, isTablet } = useContext(AuthContext) ?? {};
    const navigate = useNavigate();
    const { Header, Content, Footer } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [activeNavKey, setActiveNavKey] = useState(1);

    const navBtnList = [
        {
            icon: <BsAirplaneFill />,
            label: 'Flights',
            key: 1,
            navigateTo: '/flights'
        },
        {
            icon: <BsFillTrainFrontFill />,
            label: 'Trains',
            key: 2,
            navigateTo: '/trains'
        },
        {
            icon: <BsBuilding />,
            label: 'Hotels',
            key: 3,
            navigateTo: '/hotels'
        },
        {
            icon: <BsFillLuggageFill />,
            label: 'Trips',
            key: 4,
            navigateTo: '/trips'
        },
        {
            icon: <BsBusFrontFill />,
            label: 'Bus',
            key: 5,
            navigateTo: '/buses'
        },
    ];

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: `Logout`,
            content: 'Are you sure you want to Logout?',
            okText: 'Logout',
            okType: 'danger',
            onOk: async () => {
                setUser(null);
                setUserId('');
                // dispatch(setPermissionData([]));
                // dispatch(setUserIdData(''));
                localStorage.clear();
                navigate('/login');
                message.success('You are successfully logout.');
            },
            onCancel() { },
        });
    };

    const items = [
        {
            label: (
                <p>Change Password</p>
            ),
            key: 'changePassword',
            onClick: (e) => handleMenuClick(e)
        },
        {
            label: (
                <p>Logout</p>
            ),
            key: 'logout',
            onClick: (e) => handleMenuClick(e)
        },
    ];

    const handleMenuClick = (e) => {
        if (e.key === 'logout') {
            showDeleteConfirm();
        }
        if (e.key === 'changePassword') {
            // setChangePasswordModalOpen(true);
        }
    };

    const handleLoginModal = () => {
        setLoginModalOpen(!loginModalOpen);
    };

    const HeaderCustomBtn = ({ label, icon, classNm = '', click }) => {
        return (
            // <AppButton className={classNm ? classNm : 'navBtn'} label={label} />
            <div className={classNm} onClick={click}>
                {/* <DownOutlined /> */}
                {/* <CIcon icon={cilFlightTakeoff} style={{ color: 'red', fontSize: '16px' }} size="sm"/> */}
                {/* <BsAirplaneFill /> */}
                {icon}
                {/* <CIcon content={freeSet.cilUser} /> */}
                <span>{label}</span>
            </div>
        )
    };

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        // colorPrimary: 'black',
                        colorPrimary: '#2276e3',
                        fontFamily: 'Rubik,Avenir,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                        borderRadius: 2,
                        // colorBgContainer: '#003b95',
                    },
                    // algorithm: theme.darkAlgorithm,
                    algorithm: theme.compactAlgorithm,
                }}
            >
                <Layout className='mainLayout'>
                    <Layout>
                        <Header className='header' style={{ background: colorBgContainer }}>
                            <div className='navbar d-flex-between'>
                                <div className='d-flex-between'>
                                    <img src={logo} className="logoIcon" alt="logo" />
                                    {/* <h2>LOGO</h2> */}
                                    <div className='d-flex'>
                                        {navBtnList && navBtnList?.length > 0 && navBtnList.map((o, i) => {
                                            return (
                                                <HeaderCustomBtn
                                                    key={i}
                                                    icon={o.icon}
                                                    label={o.label}
                                                    classNm={(activeNavKey === o.key) ? 'navBtn navBtnActive' : 'navBtn'}
                                                    click={() => {
                                                        setActiveNavKey(o.key);
                                                        navigate(o.navigateTo);
                                                    }}
                                                />
                                            )
                                        })}
                                        {/* <AppButton 
                                            label='Flights'
                                            shape='round'
                                            onClick={() => {
                                                setActiveNavKey(1);
                                                navigate('/flights');
                                            }}
                                            className={activeNavKey === 1 ? 'appPrimaryButton navBtn' : 'appButton navBtn'}
                                            // style={{ fontSize: '14px' }}
                                            />
                                        <AppButton 
                                            label='Trains'
                                            shape='round'
                                            onClick={() => setActiveNavKey(2)}
                                            className={activeNavKey === 2 ? 'appPrimaryButton navBtn' : 'appButton navBtn'}
                                            // style={{ fontSize: '14px' }}
                                            />
                                        <AppButton 
                                            label='Hotels'
                                            shape='round'
                                            onClick={() => setActiveNavKey(3)}
                                            className={activeNavKey === 3 ? 'appPrimaryButton navBtn' : 'appButton navBtn'}
                                            // style={{ fontSize: '14px' }}
                                            />
                                        <AppButton 
                                            label='Trips'
                                            shape='round'
                                            onClick={() => setActiveNavKey(4)}
                                            className={activeNavKey === 4 ? 'appPrimaryButton navBtn' : 'appButton navBtn'}
                                            // style={{ fontSize: '14px' }}
                                            />
                                        <AppButton 
                                            label='Bus'
                                            shape='round'
                                            onClick={() => setActiveNavKey(5)}
                                            className={activeNavKey === 5 ? 'appPrimaryButton navBtn' : 'appButton navBtn'}
                                            // style={{ fontSize: '14px' }}
                                        /> */}
                                    </div>
                                </div>
                                {user &&
                                    <Dropdown menu={{ items }} >
                                        {(isMobile && !isDesktop && !isTablet) ?
                                            <div className='userProfileDiv'>
                                                <UserOutlined className='userIcon' />
                                                {/* <span className='userTitle'>User</span> */}
                                                {/* {currUserData?.name}
                                                <DownOutlined className='userDownArrow' /> */}
                                            </div>
                                            :
                                            <div className='userProfileDiv'>
                                                <UserOutlined className='userIcon' />
                                                {/* <span className='userTitle'>User</span> */}
                                                {currUserData?.name}
                                                <DownOutlined className='userDownArrow' />
                                            </div>
                                        }
                                    </Dropdown>
                                }
                                {!user &&
                                    <AppButton
                                        className='navbarLoginBtn appButton'
                                        label='Login/SignUp'
                                        onClick={() => {
                                            setLoginModalOpen(true);
                                        }}
                                    />
                                }
                            </div>
                        </Header>
                        <Content
                            style={{
                                // margin: '24px 16px',
                                // padding: '24px 50px',
                                minHeight: '90vh',
                                // minHeight: '80vh',
                                height: '90vh',
                                overflowY: 'scroll',
                                background: colorBgContainer,
                            }}
                        >
                            <MainRoutes />
                        </Content>
                        {/* <Footer>
                            <AppFooter />
                        </Footer> */}
                    </Layout>
                </Layout>
            </ConfigProvider>
            <AppModal
                open={loginModalOpen}
                closeIcon={false}
                children={
                    <Login
                        setLoginModalOpen={setLoginModalOpen}
                    />}
                onOk={handleLoginModal}
                onCancel={handleLoginModal}
                // height='35rem'
                width='25vw'
            />
        </>
    )
}

export default Layouts;