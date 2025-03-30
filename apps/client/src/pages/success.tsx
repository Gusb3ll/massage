import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'

const Success: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboard/user/booking')
    }, 2000)
  })

  return (
    <div className="flex h-[40dvh] flex-col items-center justify-center gap-2">
      <FaCheck className="mx-auto text-5xl text-green-500 md:text-9xl" />
      <h1 className="text-center text-2xl font-bold md:text-3xl">
        Payment completed !
      </h1>
      <p className="text-center text-lg md:text-xl">
        We will take you back to your application page shortly.
      </p>
    </div>
  )
}

export default Success
