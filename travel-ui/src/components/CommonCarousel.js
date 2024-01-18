import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react';
import Carousel from 'react-multi-carousel';

const CommonCarousel = ({ content, contentDiv, data, customLeftArrow, customRightArrow }) => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    return (
        <Carousel
            className='offersCarousel'
            responsive={responsive}
            arrows={true}
            // autoPlay
            // autoPlaySpeed={5}
            customLeftArrow={customLeftArrow}
            customRightArrow={customRightArrow}
            // customLeftArrow={<LeftOutlined style={{ backgroundColor: '#fff', position: 'absolute', top: '50%', left: '1%', fontSize: '20px', boxShadow: '0 0 10px 0 gray', borderRadius: '5px', padding: '1% 1%', zIndex: '999' }} />}
            // customRightArrow={<RightOutlined style={{ backgroundColor: '#fff', position: 'absolute', top: '50%', right: '1%', fontSize: '20px', boxShadow: '0 0 10px 0 gray', borderRadius: '5px', padding: '1% 1%', zIndex: '999' }} />}
            >
            {data && data?.length > 0 && data.map((o, i) => {
                return (
                    <>
                        {contentDiv(o, i)}
                    </>
                )
            })}
            {content}
        </Carousel>
    )
}

export default CommonCarousel;