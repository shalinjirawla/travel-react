import React, { useContext, useEffect } from 'react';
import '../styles/loader.css';
import anime from 'animejs/lib/anime.es.js';
import { Progress } from 'antd';

const CustomLoader = ({
    progressPercent = 50,
    tipText = '',
    headerRef
}) => {

    // useEffect(() => {
    //     // const timer 
    //     setTimeout(() => {
    //         timeline.restart()
    //     }, 1000);
    // }, []);

    useEffect(() => {
        let timer1 = setTimeout(() => timeline.restart(), 1000);

        return () => {
            clearTimeout(timer1);
        };
    }, []);

    // animate the prescribed nodes in sequence
    const timeline = anime.timeline({
        easing: 'linear',
        // as the animation begin remove the button by adding the prescribed class
        // begin: () => button.classList.add('hidden'),
        // as the animation is completed, show the button
        // complete: () => button.classList.remove('hidden')
    });

    // show the x character
    timeline.add({
        targets: '.start',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 350,
        delay: anime.stagger(350),
    })

    // show the dashed line
    timeline.add({
        targets: '.in-between',
        strokeDashoffset: [0, anime.setDashoffset],
        duration: 1500,
    })

    // ping, show the goalpost icon
    timeline.add({
        targets: '.end',
        rotate: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutBounce',
        duration: 400,
    });

    // as the button gets clicked restart the timeline animation
    // button.addEventListener('click', () => timeline.restart());
    return (
        <div className='customLoaderDiv'>
            {/* <svg viewBox="0 0 100 100">
                <rect width="100" height="100" rx="2" fill="#242539" />
                <g fill="none" stroke="#4DC498" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    dashed trail
                    <g transform="translate(20 35)">
                        <path d="M 0 0 v 25 h 15 l 10 -15 h 10 v 20 h 25" stroke-dasharray="3 6" stroke-dashoffset="2" />
                        animate the dash of a line atop the already dashed line
                        <path class="in-between" stroke="#242539" stroke-width="2.5" d="M 60 30 h -25 v -20 h -10 l -10 15 h -15 v -25" />
                    </g>

                    include the x character atop the dashed trail
                    <g transform="translate(20 35)">
                        duplicate the path element describing the x sign to animate the segments in sequence
                        <path class="start" d="M -3 -3 l 6 6" />
                        <path class="start" d="M 3 -3 l -6 6" />
                    </g>

                    goalpost icon
                    <g transform="translate(80 65)">
                        position the group by rotating the shape from a point on the right side
                        <g transform="translate(40 20)">
                            <g class="end">
                                <g transform="translate(-40 -20)">
                                    <path d="M 0 0 q 6 -6 6 -10 a 6 6 0 0 0 -12 0 q 0 4 6 10" />
                                    <circle cy="-10" r="2" stroke="none" fill="#4DC498" />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg> */}
            {/* <img src='https://i.pinimg.com/originals/3f/00/4f/3f004fbd0825ffbd4b9b11656a38f451.gif' alt='gif' width={100} /> */}
            {/* <img src='https://cdnl.iconscout.com/lottie/premium/thumb/flight-5634742-4707774.gif' alt='gif' width={100} /> */}
            <Progress
                percent={progressPercent}
                // size={[900, 15]}
                showInfo={false}
                className='progressBar'
                style={{ top: headerRef?.current?.getBoundingClientRect()?.bottom - '10' }}
                strokeColor={'lightgreen'}
                // strokeWidth={'100%'}
                // type='line'
                strokeLinecap='square'
            />
            <img
                src='https://cdn.dribbble.com/users/328772/screenshots/10293847/media/d45c05b5e858e2508fb1a3b84f33e932.gif'
                // src='https://cdn.dribbble.com/users/328772/screenshots/10293847/media/d45c05b5e858e2508fb1a3b84f33e932.gif'
                className='loaderImg'
                alt='gif'
            />
            <h1 className='loaderTipText'>{tipText}</h1>
        </div>
    )
}

export default CustomLoader;