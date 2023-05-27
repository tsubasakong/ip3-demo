import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import { EffectCube, Pagination } from 'swiper'

export default function DemoSwiper({ images }: { images: string[] }) {
  return (
    <>
      <Swiper
        effect={'cube'}
        grabCursor={true}
        loop={true}
        slidesPerView={1}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img
              className=" w-96 overflow-hidden rounded-lg object-cover"
              alt="design"
              style={{ aspectRatio: '1' }}
              src={`${image}`}
            />
          </SwiperSlide>
        ))}

        {/* <SwiperSlide>
          <img src="/test1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/test1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/test1.png" />
        </SwiperSlide> */}
      </Swiper>
    </>
  )
}
