import { Col, Divider, Form, Row, Typography, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import AppButton from '../components/AppButton';
import '../styles/login.css';

const Login = () => {

    const [loginForm] = Form.useForm();
    const navigate = useNavigate();
    const { Text } = Typography;
    const [isLoging, setIsLoging] = useState(false); 

    const handleLogin = async (val) => {
        try {
            // const res = await getUserLogin({ username: val.loginUsername, password: val.loginPassword, company: val.loginCompany });
            // if (res.data?.data?.token) {
            //     localStorage.setItem('token', res.data.data.token);
            //     localStorage.setItem('role', res.data.data.role);
            //     localStorage.setItem('userId', res.data.data.userId);
            //     setUser(res.data?.data?.token);
            //     setUserId(res.data?.data?.userId);
            //     // dispatch(setUserIdData(res.data?.data?.userId));
            //     navigate('/');
            // } else message.error(res.data?.data?.message);
        } catch (error) {
            message.error('Login Error');
        }
    };

    return (
        <div className='loginPage'>
            <h2>Welcome back!</h2>
            <Text type='secondary'>Please login to your account</Text>
            <Divider />
            <Form
                // {...formItemLayout}
                preserve={false}
                form={loginForm}
                name="adminLogin"
                onFinish={(values) => handleLogin(values)}
                scrollToFirstError
            >
                <Row justify='center' align='middle'>
                    <Col xl={24} lg={24} md={24} sm={24}>
                        <TextInput
                            name="loginUsername"
                            type='text'
                            className="loginInput"
                            typeMsg='The input is not valid Number!'
                            required={true}
                            requiredMsg='Please enter Username'
                            placeholder='Username or Email Id'
                            // label='Username/Email Id'
                        />
                    </Col>
                </Row>
                <Row justify='center' align='middle'>
                    <Col xl={24} lg={24} md={24} sm={24}>
                        <TextInput
                            name="loginPassword"
                            type='password'
                            className="loginInput"
                            typeMsg='The input is not valid Password!'
                            required={true}
                            requiredMsg='Please enter Password'
                            placeholder='Password'
                            // label='Password'
                        />
                    </Col>
                </Row>
                <Row className="loginBtnRow" justify="end">
                    <Col xl={24} lg={24} md={24} sm={24}>
                        <AppButton
                            label='Log In'
                            className='loginBtn appPrimaryButton'
                            // onKeyPress={handleKeyPress}
                            htmlType="submit"
                            loading={isLoging}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Login;