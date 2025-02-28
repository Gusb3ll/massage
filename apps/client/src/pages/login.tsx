import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
// import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaLock, FaUser } from 'react-icons/fa6'
import { toast } from 'sonner'

import { LoginArgs } from '@/services/user'

function Login() {
  const router = useRouter()
  const { data: session } = useSession()
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

      if (session?.user?.role === 'MASSAGER') {
        router.push('/massager')
      } else if (session?.user?.role === 'PROPERTY_OWNER') {
        router.push('/property')
      } else {
        router.push('/dashboard')
      }

      // router.push('/dashboard')
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-10 flex w-full max-w-7xl rounded-lg border bg-white shadow-lg">
        <div className="flex w-full flex-col md:flex-row">
          <div className="hidden h-full w-full sm:block md:w-1/2">
            <Image
              src="/images/login.png"
              alt="Login"
              width={1000}
              height={1000}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>

          <div className="flex w-full items-center justify-center md:w-1/2">
            <div className="flex w-full max-w-[400px] flex-col gap-4 p-8">
              <div className="flex justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={90}
                  height={40}
                  className="h-[52px] w-[52px] md:h-[90px] md:w-[90px]"
                />
              </div>

              <h1 className="text-center text-2xl font-bold">Login</h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-5 flex flex-col gap-2"
              >
                <p>Email</p>
                <label className="input input-bordered flex items-center gap-2">
                  <FaUser />
                  <input
                    type="email"
                    className="grow"
                    placeholder="Enter email"
                    {...register('email', { required: true })}
                  />
                </label>
                <p>Password</p>
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
                  className="btn btn-primary disabled:btn-disabled mt-6 text-white"
                >
                  Confirm
                </button>
              </form>
              <hr className="mt-5" />
              <Link href="/register" className="mt-4 text-center text-sm">
                Don’t have an account ?{' '}
                <span className="text-primary hover:underline">Register!</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
