import React, { FC, Fragment, FunctionComponent, ReactElement } from 'react'
import Image from 'next/image'

interface Props {
  title: string
  subtitle: string
}

const Banner = ({ title, subtitle }: Props) => {
  return (
    <div className="relative z-0 flex h-full w-full items-center justify-center bg-gradientBanner py-8  pt-[100px] text-white">
      {/* <Image
        className="pointer-events-none z-10"
        alt="banner"
        src="/designs-banner.png"
        layout="fill"
        objectFit="cover"
        quality={100}
      /> */}
      {/* <div className="bg-gradientBanner" /> */}
      <div className="flex w-full flex-col items-start justify-between gap-4 py-4 pt-12 md:flex-row lg:px-10">
        <div className="z-10 flex flex-col gap-6 pl-8">
          <div className="font-title text-2xl tracking-wider md:text-3xl lg:text-4xl xl:text-5xl">
            {title}
          </div>
          <div className="text-lg font-light tracking-wide opacity-80">
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
