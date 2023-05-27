import { classNames } from '@lib/utils'
import { Loading } from '@nextui-org/react'
import React from 'react'

function LoadingState({ content = 'loading...' }: { content: string }) {
  return (
    <div className="fixed z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60">
      <div
        className={classNames(
          'flex w-[44rem] flex-col items-center justify-center rounded-xl px-4 py-8 text-center'
        )}
      >
        <Loading>Loading</Loading>
      </div>
    </div>
  )
}

export default LoadingState
