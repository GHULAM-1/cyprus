import React from 'react'

export default function Navbar() {
  return (
    <div className='flex justify-between items-center py-6 px-[48px] p-4 max-w-[1920px] mx-auto'>
      <div>
        <img src="/logo.jpg" alt="logo" className='w-[126px]' />
      </div>
      <div className='pr-[22px]'>
        Become a supplier
      </div>
    </div>
  )
}
