import { useMutation } from '@tanstack/react-query'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { toast } from 'sonner'

import { verifyToken } from '@/services/user'

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  try {
    const token = ctx.params?.token as string | undefined
    if (!token) {
      return { notFound: true }
    }

    return { props: { token } }
  } catch {
    return { notFound: true }
  }
}) satisfies GetServerSideProps<{ token: string }>

const VerifyEmail: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter()

  const hasRendered = useRef(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  const verifyTokenMutation = useMutation({
    mutationFn: (t: string) => verifyToken(t),
    retry: 0,
  })

  useEffect(() => {
    if (verifyTokenMutation.isIdle && !hasRendered.current) {
      hasRendered.current = true
      verifyTokenMutation
        .mutateAsync(token)
        .then(() => {
          setIsSuccess(true)
          setIsLoading(false)
          setTimeout(() => {
            router.push('/login')
          }, 200)
        })
        .catch(e => {
          toast.error((e as Error).message)
          setIsSuccess(false)
          setIsLoading(false)
        })
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <></>
      ) : isSuccess ? (
        <div className="mt-12 flex w-full flex-col items-center gap-6">
          <FaCheckCircle className="text-8xl text-green-400" />
          <h1 className="text-3xl font-bold">ยืนยันอีเมลสำเร็จ</h1>
        </div>
      ) : (
        <div className="mt-12 flex w-full flex-col items-center gap-6">
          <FaExclamationCircle className="text-8xl text-red-400" />
          <h1 className="text-3xl font-bold">
            ไม่สามารถยืนยันอีเมลได้ กรุณาลองใหม่อีกครั้ง
          </h1>
        </div>
      )}
    </>
  )
}

export default VerifyEmail
