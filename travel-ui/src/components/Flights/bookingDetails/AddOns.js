import { Col, Row, Tabs, Tooltip } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { flightBookingData } from '../../../JSON/seat';
import Button from '../../AppButton';
import { AuthContext } from '../../../context/AuthProvider';

const AddOns = ({ travellers }) => {

    const containerRef = useRef(null);
    const { rsWidths: { is620, is1200, is1300 }, isTablet } = useContext(AuthContext)??{};
    const [allBookingSeatList, setAllBookingSeatList] = useState([]);
    const [allBookingSeatNewList, setAllBookingSeatNewList] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([]);
    const [seatList, setSeatList] = useState([]);
    const [filterByPriceList, setFilterByPriceList] = useState([]);
    const [travellersList, setTravellersList] = useState([]);

    useEffect(() => {
        if (containerRef.current && selectedPrice.length > 0) {
            const index = allBookingSeatList.findIndex((row) =>
                row.some((seat) => selectedPrice.includes(seat?.seatToolTip?.actualFare))
            );

            if (index !== -1) {
                containerRef.current.children[index].scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [selectedPrice, allBookingSeatList]);

    useEffect(() => {
        const uniquePrices = Array.from(new Set(allBookingSeatNewList.flat().map(item => item?.seatToolTip?.actualFare)));
        const newArray = uniquePrices.map((price, index) => ({
            id: index + 1,
            price: price,
            isSelected: false
        }));
        setFilterByPriceList(newArray);
    }, [allBookingSeatNewList]);

    useEffect(() => {
        generateTravellersList();
    }, [travellers, seatList]);

    useEffect(() => {
        if (flightBookingData) {
            formatListFunc(flightBookingData[0]);
        }
    }, [JSON.stringify(flightBookingData)]);

    const formatListFunc = async (list) => {
        let data = list?.cards?.SEATS_N_MEALS?.data?.anclryResponse?.SEATS?.anclryInfo[0];
        let seatData = data?.cLyt?.deckMap?.MAIN?.sm;
        setAllBookingSeatList(seatData);
        setAllBookingSeatNewList(seatData);
    };

    const getSeatFilterPrice = (index) => {
        return {
            1: 'selectFSeatRound',
            2: 'borderFRed',
            3: 'borderFOrange',
        }[index];
    };

    const getSeatFilterClick = (index) => {
        return {
            1: 'clickedGreen',
            2: 'clickedRed',
            3: 'clickedOrange',
        }[index];
    };

    const handleFilterClick = (data) => {
        setFilterByPriceList((prevFilterOptions) =>
            prevFilterOptions.map((option) =>
                option.id === data?.id ? { ...option, isSelected: !option.isSelected } : option
            )
        );

        const selectedFilter = filterByPriceList.find((option) => option.id === data?.id);
        if (selectedFilter) {
            if (selectedPrice.includes(selectedFilter.price)) {
                setSelectedPrice((prevSelectedPrices) =>
                    prevSelectedPrices.filter((price) => price !== selectedFilter.price)
                );
            } else {
                setSelectedPrice((prevSelectedPrices) => [...prevSelectedPrices, selectedFilter.price]);
            }
        }
    };

    const handleSeatClick = (data, rowIndex) => {
        setAllBookingSeatList((prevSeatData) =>
            prevSeatData.map((row) =>
                row.map((seat) =>
                    seat.id === data?.id ? { ...seat, isSelected: !seat.isSelected } : seat
                )
            )
        ); 
        
        if (seatList.length <= travellersList.length) {
            const existingSeat = seatList.find((seat) => seat.id === data.id);

            setSeatList((prevSeatList) => {
                let updatedSeatList;
                if (existingSeat) {
                    updatedSeatList = prevSeatList.filter((seat) => seat.id !== existingSeat.id);
                } else {
                    updatedSeatList = [...prevSeatList, { ...data, isSelected: true, rowIndex: rowIndex }];
                    if (updatedSeatList.length > travellersList.length) {
                        updatedSeatList.shift();
                    }
                }
                return updatedSeatList;
            });

            if (seatList.length >= travellersList.length) {
                if (!existingSeat) {
                    const firstSeatToUnselect = seatList[0];
                    setAllBookingSeatList((prevSeatData) =>
                        prevSeatData.map((row, index) =>
                            index === firstSeatToUnselect.rowIndex
                            ? row.map((seat) => {
                                if (seat.id === firstSeatToUnselect.id) {
                                    return { ...seat, isSelected: false };
                                } else {
                                    return seat;
                                }
                            }) : row
                        )
                    );
                }
            }
        }
    };

    const totalActualPrice = (seatList.map(o => o?.seatToolTip?.actualFare)).reduce((total, ticket) => {
        const priceValue = Number(ticket.replace(/[^\d]/g, ''));
        if (!isNaN(priceValue)) {
            return total + priceValue;
        }
        return total;
    }, 0);

    const generateTravellersList = () => {
        const newTravellersList = [];

        for (let i = 0; i < travellers?.adult + travellers?.child; i++) {
            const selectSeat = seatList.map(o => o?.seatLabel);
            const travellerLabel = selectSeat[i];

            newTravellersList.push(
                <div key={`traveller-${i}`}>
                    ADULT {i + 1} - <span className='passengerFStyle'>{travellerLabel}</span>
                </div>
            );
        }
        setTravellersList(newTravellersList);
    };

    const getSeatFilterClass = (pbIdx) => {
        return {
            0: 'selectFSeatRound',
            1: 'borderFOrange',
            2: 'borderFRed',
        }[pbIdx];
    };

    const getSeatFilterBackground = (pbIdx) => {
        return {
            0: 'clickedGreen',
            1: 'clickedOrange',
            2: 'clickedRed',
        }[pbIdx];
    };

    const getSelectedPriceVal = (val) => {
        return selectedPrice.find(o => o === val?.seatToolTip?.actualFare);
    };

    const seatsTab = (
        <>
            <Row align='top' justify='space-between'>
                <Col xl={is620 ? 15 : 14} lg={is620 ? 15 : 14} md={is620 ? 15 : 14} sm={is620 ? 15 : 14} xs={is620 ? 15 : 14}>
                    <div className='frontMainDiv'>

                        <div className='curveFWrap'>
                            <div className='curveFTop'></div>
                            <div className='curveFTop curveFLayerOne'></div>
                            <div className='curveFTop curveFLayerTwo'></div>
                            <div className='curveFDivider'></div>
                            <p className='frontFPlane'>FRONT</p>
                        </div>

                        <div className='frontFBelowDiv' ref={containerRef}>
                            {allBookingSeatList.map((row, rowIndex) => (
                                <>
                                    <div className='seatFRow' key={rowIndex}>
                                        <Row align='middle' justify='center'>
                                            {row.map((data, index) => (
                                                <>
                                                    {data?.id ? <Col xl={is1200 ? 3 : 2} lg={is1200 ? 3 : 2} md={is1200 ? 3 : 2} sm={is1200 ? 3 : 2} xs={is1200 ? 3 : 2} key={index}>
                                                        <div className='selectFSeat'>
                                                            {selectedPrice.length !== 0 ?
                                                                (<Tooltip title={data?.iconRef !== 'RSRVD' && getSelectedPriceVal(data)}>
                                                                    <div
                                                                        className={`selectFSeatDiv ${(data?.iconRef !== 'RSRVD' && (getSelectedPriceVal(data) !== data?.seatToolTip?.actualFare)) ? 'filterFSeatByPrice' : ''} ${data?.iconRef === 'RSRVD' ? 'notReservedSeat cursorAuto' : getSeatFilterClass(data?.pbIdx)} ${data?.isSelected ? getSeatFilterBackground(data?.pbIdx) : ''}`}
                                                                        onClick={() => { data?.iconRef !== 'RSRVD' && getSelectedPriceVal(data) === data?.seatToolTip?.actualFare && handleSeatClick(data, rowIndex) }}
                                                                    >
                                                                        <span className='selectPerFSeat'>{data?.iconRef === 'RSRVD' ? <CloseOutlined /> : (data?.seatLabel)}</span>
                                                                    </div>
                                                                </Tooltip>) :
                                                                (<Tooltip title={data?.iconRef !== 'RSRVD' && data?.seatToolTip?.actualFare}>
                                                                    <div
                                                                        className={`selectFSeatDiv ${data?.iconRef === 'RSRVD' ? 'notReservedSeat cursorAuto' : getSeatFilterClass(data?.pbIdx)} ${data?.isSelected ? getSeatFilterBackground(data?.pbIdx) : ''}`}
                                                                        onClick={() => { data?.iconRef !== 'RSRVD' && handleSeatClick(data, rowIndex) }}
                                                                    >
                                                                        <span className='selectPerFSeat'>{data?.iconRef === 'RSRVD' ? <CloseOutlined /> : (data?.seatLabel)}</span>
                                                                    </div>
                                                                </Tooltip>)
                                                            }
                                                        </div>
                                                    </Col> : <Col><div className='selectSpaceSeat'></div></Col>}
                                                </>
                                            ))}
                                        </Row>
                                    </div>
                                </>
                            ))}
                        </div>

                        <div className='curveFWrap curveFWrapBack'>
                            <div className='curveFTop curveFBottom'></div>
                        </div>
                    </div>
                </Col>

                <Col xl={is620 ? 9 : 10} lg={is620 ? 9 : 10} md={is620 ? 9 : 10} sm={is620 ? 9 : 10} xs={is620 ? 9 : 10} className='rightFCol'>
                    <Row align='top'>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24} className='alignSelfCenter'>
                            {travellersList.map((travellerElement, index) => (
                                <div key={index}>{travellerElement}</div>
                            ))}
                        </Col>
                    </Row>
                    <Row align='top' justify='space-between'>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24} className='seatByFPrice'>
                            <span className='rowFSeatTitle'>TAP TO FILTER SEATS BY PRICE</span>
                        </Col>
                    </Row>

                    <div className='seatFBox'>
                        <Row align='top' className='perSeatFBox'>
                            <Col xl={isTablet ? 5 : is1300 ? 4 : 3} lg={isTablet ? 5 : is1300 ? 4 : 3} md={isTablet ? 5 : is1300 ? 4 : 3} sm={isTablet ? 5 : is1300 ? 4 : 3} xs={isTablet ? 5 : is1300 ? 4 : 3}>
                                <div className='selectFSeatDiv notReservedSeat'><span className='selectPerFSeat'><CloseOutlined /></span></div>
                            </Col>
                            <Col xl={isTablet ? 19 : is1300 ? 20 : 21} lg={isTablet ? 19 : is1300 ? 20 : 21} md={isTablet ? 19 : is1300 ? 20 : 21} sm={isTablet ? 19 : is1300 ? 20 : 21} xs={isTablet ? 19 : is1300 ? 20 : 21} className='alignSelfCenter'>
                                <span>Occupied</span>
                            </Col>
                        </Row>
                    </div>
                    {filterByPriceList.map((data) => (
                        <>
                            <div className='seatFBox' key={data?.id}>
                                <Row align='top' className='perSeatFBox'>
                                    <Col xl={isTablet ? 5 : is1300 ? 4 : 3} lg={isTablet ? 5 : is1300 ? 4 : 3} md={isTablet ? 5 : is1300 ? 4 : 3} sm={isTablet ? 5 : is1300 ? 4 : 3} xs={isTablet ? 5 : is1300 ? 4 : 3}>
                                        <div
                                            className={`selectFSeatDiv ${getSeatFilterPrice(data?.id)} ${data?.isSelected ? getSeatFilterClick(data?.id) : ''}`}
                                            onClick={() => { handleFilterClick(data) }}>
                                        </div>
                                    </Col>
                                    <Col xl={isTablet ? 19 : is1300 ? 20 : 21} lg={isTablet ? 19 : is1300 ? 20 : 21} md={isTablet ? 19 : is1300 ? 20 : 21} sm={isTablet ? 19 : is1300 ? 20 : 21} xs={isTablet ? 19 : is1300 ? 20 : 21} className='alignSelfCenter'>
                                        <span>{data?.price}</span>
                                    </Col>
                                </Row>
                            </div>
                        </>
                    ))}
                </Col>
            </Row>
        </>
    );

    const items = [
        {
            key: '1',
            label: <b>AMD - BOM, 6E-5346</b>,
            children: seatsTab,
        },
        {
            key: '2',
            label: <b>BOM - AMD, 6E-5085</b>,
            children: seatsTab,
        }
    ];

    return (
        <div>
            {/* <Card className='card'> */}
            <div className='Addons'>
                <Row align='middle' justify='space-between'>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <span className='pin'>ADDONS</span>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'>
                        {totalActualPrice === 0 ?
                            <Button className='skipToPayment' label='Skip to Payment' />
                            :
                            <span className='pin'>{`₹ ${totalActualPrice}`}</span>
                        }
                    </Col>
                </Row>
                <hr />

                <Row align='middle' justify='space-between'>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <span className='seatsTitle'>Seats</span>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'>
                        {/* <span className='pin'>{totalActualPrice !== 0 ? `₹ ${totalActualPrice}` : ''}</span> */}
                    </Col>
                </Row>

                <div className='seatFCard'>
                    <Tabs defaultActiveKey="1" items={items} className='addOndFTabsStyle' />
                </div>
            {/* </Card> */}
            </div>
        </div>
    );
}

export default AddOns;