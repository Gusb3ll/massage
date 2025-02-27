import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
// import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaLock, FaUser } from 'react-icons/fa6'
import { toast } from 'sonner'

import { LoginArgs } from '@/services/user'

function Login() {
  const router = useRouter()
  //   const [isLoading, setIsLoading] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginArgs>()

  const onSubmit: SubmitHandler<LoginArgs> = async args => {
    try {
      const res = await signIn('credentials', {
        email: args.email,
        password: args.password,
        redirect: false,
      })
      if (!res?.ok) {
        throw new Error(
          res?.error ?? 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ โปรดลองอีกครั้ง',
        )
      }
      router.push('/dashboard')
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  return (
    <div className="m-4 flex h-[70vh] items-center justify-center md:h-full">
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white bg-opacity-70 p-8 shadow-xl transition-all duration-500 ease-in-out hover:shadow-2xl md:w-[500px]">
        <h1 className="text-center text-2xl font-bold">เข้าสู่ระบบ</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2">
            <FaUser />
            <input
              type="email"
              className="grow"
              placeholder="อีเมล"
              {...register('email', { required: true })}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <FaLock />
            <input
              type="password"
              className="grow"
              placeholder="••••••••••••••••"
              {...register('password', { required: true })}
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary disabled:btn-disabled text-white"
          >
            เข้าสู่ระบบ
          </button>
        </form>
        <Link href="/register" className="mt-4 text-center text-sm">
          ยังไม่มีบัญชีผู้ใช้?{' '}
          <span className="text-primary hover:underline">สมัครสมาชิกเลย!</span>
        </Link>
      </div>
    </div>
  )
}

export default Login
