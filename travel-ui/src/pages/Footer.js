import { Col, Row } from 'antd';
import React from 'react';
import { RiFacebookLine, RiGoogleLine, RiLinkedinLine, RiTwitterLine, RiYoutubeLine } from 'react-icons/ri';

const AppFooter = () => {
    return (
        <Row className='footerRow' justify='space-evenly' align='top'>
            <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                <Row><h2>HOLIDAY TOUR & TRAVELS</h2></Row>
                <Row><p>World's leading tour and travels Booking website,Over 30,000 packages worldwide.</p></Row>
            </Col>
            <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                <Row><h2>ADDRESS & CONTACT INFO</h2></Row>
                <Row><p>107-108 SAKAR IX 1ST FLOOR BESIDE-OLD RBI BULLDING NEAR. CITY GOLD ASHRAM ROAD AHMEDABAD 380009</p></Row>
                <Row><Col xl={6}><h2>PHONE: </h2></Col><Col xl={18}><h2>079 - 48481115,<br/> 079 - 48481116</h2></Col></Row>
                <Row><p>jirawalatravelspvtltd@gmail.com</p></Row>
            </Col>
            <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                <Row><h2>SUPPORT & HELP</h2></Row>
                <Row>
                    <Col>
                        <ul>
                            <li>About us</li>
                            <li>Feedbacks</li>
                            <li>Use Cases</li>
                            <li>Discount</li>
                            <li>Branding Offers</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <li>FAQ</li>
                            <li>Blog</li>
                            <li>Advertise us</li>
                            <li>Vacations</li>
                            <li>Contact Us</li>
                        </ul>
                    </Col>
                </Row>
            </Col>
            <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                <Row><h2>FOLLOW WITH US</h2></Row>
                <Row><p>Join the thousands of other There are many variations of passages of Lorem Ipsum available</p></Row>
                <Row>
                    <RiFacebookLine fontSize={30} style={{ margin: '0 1%', cursor: 'pointer', padding: '2%', border: '1px solid gray', borderRadius: '50%' }} />
                    <RiGoogleLine fontSize={30} style={{ margin: '0 1%', cursor: 'pointer', padding: '2%', border: '1px solid gray', borderRadius: '50%' }} />
                    <RiTwitterLine fontSize={30} style={{ margin: '0 1%', cursor: 'pointer', padding: '2%', border: '1px solid gray', borderRadius: '50%' }} />
                    <RiLinkedinLine fontSize={30} style={{ margin: '0 1%', cursor: 'pointer', padding: '2%', border: '1px solid gray', borderRadius: '50%' }} />
                    <RiYoutubeLine fontSize={30} style={{ margin: '0 1%', cursor: 'pointer', padding: '2%', border: '1px solid gray', borderRadius: '50%' }} />
                </Row>
            </Col>
        </Row>
    )
}

export default AppFooter;