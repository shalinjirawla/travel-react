import React, { useContext } from 'react'
import AppModal from '../../AppModal'
import { Card, Col, Divider, Row, Tag, Timeline } from 'antd'
import { AuthContext } from '../../../context/AuthProvider'

const TrainRoutes = ({ routeModalOpen, setRouteModalOpen }) => {
    
    const { rsWidths: { is930 } } = useContext(AuthContext);

    const routeStationData = [
        {
            station: 'ADI - Ahmedabad Junction',
            city: 'Ahmedabad',
            arrival: '---',
            halt: '---',
            departure: '08:45 PM',
            distance: '0 KM',
            pL: 'NA',
        },
        {
            station: 'MAN - Maninagar Railway Station',
            city: 'Maninagar',
            arrival: '08:53 PM',
            halt: '2m',
            departure: '08:55 PM',
            distance: '3 KM',
            pL: 'NA',
        },
        {
            station: 'MHD - Mahemdavad Kheda Road Railway Station',
            city: 'Mahemdavad Kheda',
            arrival: '09:21 PM',
            halt: '2m',
            departure: '09:23 PM',
            distance: '27 KM',
            pL: 'NA',
        },
        {
            station: 'ND - Nadiad Junction',
            city: 'Nadiad',
            arrival: '09:33 PM',
            halt: '2m',
            departure: '09:35 PM',
            distance: '45 KM',
            pL: 'NA',
        },
        {
            station: 'ANND - Anand Junction',
            city: 'Anand',
            arrival: '09:50 PM',
            halt: '2m',
            departure: '09:52 PM',
            distance: '64 KM',
            pL: 'NA',
        },
        {
            station: 'BRC - Vadodara Railway Station',
            city: 'Vadodara',
            arrival: '10:28 PM',
            halt: '5m',
            departure: '10:33 PM',
            distance: '99 KM',
            pL: 'NA',
        },
        {
            station: 'BH - Bharuch Junction',
            city: 'Bharuch',
            arrival: '11:25 PM',
            halt: '2m',
            departure: '11:27 PM',
            distance: '152 KM',
            pL: 'NA',
        },
        {
            station: 'KSB - Kosamba Junction',
            city: 'Kosamba',
            arrival: '11:55 PM',
            halt: '2m',
            departure: '11:57 PM',
            distance: '177 KM',
            pL: 'NA',
        },
        {
            day: 'Day 2',
            station: 'ST - Surat Railway Station',
            city: 'Surat',
            arrival: '12:32 AM',
            halt: '5m',
            departure: '12:37 AM',
            distance: '204 KM',
            pL: 'NA',
        },
        {
            station: 'NVS - Navsari Railway Station',
            city: 'Navsari',
            arrival: '01:05 AM',
            halt: '2m',
            departure: '01:07 AM',
            distance: '233 KM',
            pL: 'NA',
        },
        {
            station: 'BL - Valsad Railway Station',
            city: 'Valsad',
            arrival: '01:53 AM',
            halt: '5m',
            departure: '01:58 AM',
            distance: '271 KM',
            pL: 'NA',
        },
        {
            station: 'VAPI - Vapi Railway Station',
            city: 'Vapi',
            arrival: '02:18 AM',
            halt: '2m',
            departure: '02:20 AM',
            distance: '297 KM',
            pL: 'NA',
        },
        {
            station: 'UBR - Umbargam Road Railway Station',
            city: 'Umbargam',
            arrival: '02:51 AM',
            halt: '2m',
            departure: '02:53 AM',
            distance: '320 KM',
            pL: 'NA',
        },
        {
            station: 'PLG - Palghar Railway Station',
            city: 'Palghar',
            arrival: '03:32 AM',
            halt: '2m',
            departure: '03:34 AM',
            distance: '370 KM',
            pL: 'NA',
        },
        {
            station: 'BVI - Mumbai Borivali Railway Station',
            city: 'Borivali',
            arrival: '04:28 AM',
            halt: '5m',
            departure: '04:33 AM',
            distance: '423 KM',
            pL: 'NA',
        },
        {
            station: 'ADH - Mumbai Andheri Railway Station',
            city: 'Andheri',
            arrival: '04:51 AM',
            halt: '2m',
            departure: '04:53 AM',
            distance: '452 KM',
            pL: 'NA',
        },
        {
            day: 'End Station',
            station: 'BDTS - Mumbai Bandra Terminus Railway Station',
            city: 'Bandra Terminus',
            arrival: '05:25 AM',
            halt: '---',
            departure: '---',
            distance: '441 KM',
            pL: 'NA',
        }
    ];

    const routeStations = (o, i) => <>
        <div key={i}>
            {o?.day && <div><span><Tag className='dayRoute'>{o?.day}</Tag></span><br /></div>}
            <span className='routeTStationName'>{o?.station}</span>
            <Row align='middle' justify='space-between'>
                <Col xl={is930 ? 8 : 4} lg={is930 ? 8 : 4} md={is930 ? 8 : 4} sm={is930 ? 8 : 4} xs={is930 ? 8 : 4}>
                    <Row>
                        <Col xl={5} lg={5} md={5} sm={5} xs={5}><span className='routeResFont'>City</span></Col>
                        <Col xl={19} lg={19} md={19} sm={19} xs={19} className='textAlignEnd'><span className='routeTStationData routeResFont'>{o?.city}</span></Col>
                    </Row>
                </Col>
                <div className='divRLine'></div>
                <Col xl={is930 ? 7 : 4} lg={is930 ? 7 : 4} md={is930 ? 7 : 4} sm={is930 ? 7 : 4} xs={is930 ? 7 : 4}>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}><span className='routeResFont'>Arrival</span></Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'><span className='routeTStationData routeResFont'>{o?.arrival}</span></Col>
                    </Row>
                </Col>
                <div className='divRLine'></div>
                <Col xl={is930 ? 7 : 3} lg={is930 ? 7 : 3} md={is930 ? 7 : 3} sm={is930 ? 7 : 33} xs={is930 ? 7 : 3}>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}><span className='routeResFont'>Halt</span></Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'><span className='routeTStationData routeResFont'>{o?.halt}</span></Col>
                    </Row>
                </Col>
                {!is930 && <div className='divRLine'></div>}
                <Col xl={is930 ? 8 : 4} lg={is930 ? 8 : 4} md={is930 ? 8 : 4} sm={is930 ? 8 : 4} xs={is930 ? 8 : 4}>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}><span className='routeResFont'>Departure</span></Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'><span className='routeTStationData routeResFont'>{o?.departure}</span></Col>
                    </Row>
                </Col>
                <div className='divRLine'></div>
                <Col xl={is930 ? 7 : 4} lg={is930 ? 7 : 4} md={is930 ? 7 : 4} sm={is930 ? 7 : 4} xs={is930 ? 7 : 4}>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}><span className='routeResFont'>Distance</span></Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'><span className='routeTStationData routeResFont'>{o?.distance}</span></Col>
                    </Row>
                </Col>
                <div className='divRLine'></div>
                <Col xl={is930 ? 7 : 3} lg={is930 ? 7 : 3} md={is930 ? 7 : 3} sm={is930 ? 7 : 3} xs={is930 ? 7 : 3}>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}><span className='routeResFont'>PL</span></Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'><span className='routeTStationData routeResFont'>{o?.pL}</span></Col>
                    </Row>
                </Col>
            </Row>
            <Divider />
        </div>
    </>
    
    const trainRouteData = <>
        <div className='trainRouteModalData'>
            <Card className='routeTrainCard modal-TR-body'>
                <div><Tag className='dayRoute dayOneRoute'>Day 1</Tag></div><br />
                <div>
                    <span className='routeTStationData'>Starting Station</span>
                    <Timeline
                        className='routeTimeline'
                        items={routeStationData.map((data, index) => ({
                            children: routeStations(data, index),
                            // color: 'black'
                        }))}
                    />
                </div>
            </Card>
        </div>
    </>

    const handleRouteModal = () => {
        setRouteModalOpen(!routeModalOpen);
    };

    return (
        <div>
            <AppModal
                title='Train Route'
                className='routeTrainModalStyle'
                open={routeModalOpen}
                children={trainRouteData}
                onOk={handleRouteModal}
                onCancel={handleRouteModal}
            />
        </div>
    );
}

export default TrainRoutes;