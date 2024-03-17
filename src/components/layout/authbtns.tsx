'use client'

import { signOut, useSession } from 'next-auth/react'

const AuthBtns = () => {
  const { data: session, status } = useSession()

  const handleSignout = async () => {
    signOut()
  }

  if (status === 'authenticated') {
    return (
      <div className='flex gap-4'>
        <p>Signed in as {session?.user?.email}</p>
        <button onClick={handleSignout} className='font-semibold'>
          Sign out
        </button>
      </div>
    )
  }

  return <a href='/api/auth/signin'>Sign in</a>
}

export default AuthBtns
