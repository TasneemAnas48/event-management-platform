import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { RSwiperProps } from '@/types/index.type';

const RSwiper = ({ slides, config, className }: RSwiperProps) => {
    const {
        slidesPerView = 1,
        navigation = true,
        pagination = false,
        scrollbar = false,
        prevStyle,
        nextStyle,
        autoplay,
        loop = false,
        onSlideChange = () => { },
        onSwiper = () => { },
        breakpoints,
    } = config;

    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={slidesPerView}
            navigation={prevStyle && nextStyle
                ? {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
                : navigation}
            pagination={pagination}
            scrollbar={scrollbar}
            autoplay={autoplay}
            loop={loop}
            onSlideChange={onSlideChange}
            onSwiper={onSwiper}
            breakpoints={breakpoints}
            className={className}
        >
            {slides?.map((slide, index) => (
                <SwiperSlide key={index}>{slide}</SwiperSlide>
            ))}

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-next" style={nextStyle ? nextStyle : undefined}></div>
            <div className="swiper-button-prev" style={prevStyle ? prevStyle : undefined}></div>
        </Swiper>
    );
};

export default RSwiper;