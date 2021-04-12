import React, { FC } from 'react';
import { useMediaQuery } from '@material-ui/core';
import SwiperCore, { Keyboard, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import { AUTHORS } from 'appConstants';
import { OurTeamCard } from './components/OurTeamCard';
import { useStyles } from './styled';

SwiperCore.use([Navigation, Keyboard]);

export const OurTeam: FC = () => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const classes = useStyles();

  if (isMobile) {
    return (
      <div className={classes.sliderContainer}>
        <div className="swiper-button-prev" />
        <Swiper
          spaceBetween={60}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          keyboard={{
            enabled: true,
          }}
          className={classes.slider}
        >
          {AUTHORS.map((props) => (
            <SwiperSlide key={props.name}>
              <OurTeamCard {...props} isMobile={true} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next" />
      </div>
    );
  }

  return (
    <>
      {AUTHORS.map((props) => (
        <OurTeamCard {...props} key={props.name} />
      ))}
    </>
  );
};
