import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  RegisterArgs as BaseRegisterArgs,
  register as registerFn,
} from '@/services/user'

type RegisterArgs = BaseRegisterArgs & { confirmPassword: string }

const Register = () => {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterArgs>()

  const registerMutation = useMutation({
    mutationFn: (args: RegisterArgs) => registerFn(args),
  })

  // const registerMutation = useMutation({
  //   mutationFn: async (args: RegisterArgs) => {
  //     return await registerFn(args)
  //   },
  // })

  const onSubmit: SubmitHandler<RegisterArgs> = async args => {
    if (step === 1) {
      return setStep(2)
    }

    if (step === 2) {
      return setStep(3)
    }

    if (step === 3) {
      try {
        if (args.password !== args.confirmPassword) {
          throw new Error('รหัสผ่านไม่ตรงกัน')
        }
        if (args.firstName.length < 2 || args.lastName.length < 2) {
          throw new Error('กรุณาระบุชื่อและนามสกุลของคุณให้ถูกต้อง')
        }
        if (args.password.length < 8) {
          throw new Error('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
        }

        // const res = await registerMutation.mutateAsync(args)

        // if (!res || !res.accessToken) {
        //   throw new Error('ไม่สามารถรับ accessToken จากการสมัครสมาชิกได้')
        // }
        // toast.success('สมัครสมาชิกสำเร็จ!')

        const res = await registerMutation.mutateAsync(args)
        if (!res || !res.accessToken) {
          throw new Error('ไม่สามารถรับ accessToken จากการสมัครสมาชิกได้')
        }

        await signIn('credentials-register', {
          accessToken: res.accessToken,
          redirect: false,
        })
        router.push('/login')
      } catch (e) {
        toast.error((e as Error).message)
      }
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

              <h1 className="text-center text-2xl font-bold">
                {step === 1
                  ? 'Register'
                  : step === 2
                    ? 'Information'
                    : 'Which role you want to be?'}
              </h1>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-3"
              >
                {step === 1 ? (
                  <>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        className="grow"
                        placeholder="Email"
                        {...register('email', { required: true })}
                      />
                    </label>
                    <div className="flex flex-row gap-4">
                      <input
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Password"
                        {...register('password', { required: true })}
                      />
                    </div>
                    <input
                      type="password"
                      className="input input-bordered w-full"
                      placeholder="Confirm Password"
                      {...register('confirmPassword', { required: true })}
                    />
                    <button
                      type="button"
                      className="btn btn-primary text-white"
                      onClick={() => setStep(2)}
                    >
                      Next
                    </button>
                    <hr className="mt-5" />
                    <Link href="/login" className="mt-4 text-center text-sm">
                      Already have an account?{' '}
                      <span className="text-primary hover:underline">
                        Login
                      </span>
                    </Link>
                  </>
                ) : step === 2 ? (
                  <>
                    <div className="flex flex-row gap-4">
                      <div>
                        {' First Name'}
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          placeholder="First Name"
                          {...register('firstName', { required: true })}
                        />
                      </div>
                      <div>
                        {' Last Name'}
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          placeholder="Last Name"
                          {...register('lastName', { required: true })}
                        />
                      </div>
                    </div>
                    <div>
                      {'Tel'}
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="phone Number"
                        {...register('phoneNumber', { required: true })}
                      />
                    </div>
                    <div>
                      {'Date of Birth'}
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="dateOfBirth"
                        {...register('dateOfBirth', { required: true })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {'Gender'}
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            value="MALE"
                            {...register('gender', { required: true })}
                            className="radio radio-primary"
                          />
                          Male
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            value="FEMALE"
                            {...register('gender', { required: true })}
                            className="radio radio-primary"
                          />
                          Female
                        </label>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn btn-primary mt-6 text-white"
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex flex-col gap-4">
                        <div className="relative">
                          <Image
                            src="/images/user.png"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="h-full w-full rounded-md object-cover"
                          />
                          <span className="absolute left-0 top-0 p-3 text-lg font-bold text-[#ffffff]">
                            Use massage services (User)
                          </span>
                          <label className="absolute bottom-4 right-4 flex items-center gap-2">
                            <input
                              type="radio"
                              value="USER"
                              {...register('role', { required: true })}
                              className="radio radio-primary"
                            />
                          </label>
                        </div>

                        <div className="flex w-full justify-center gap-4">
                          <div className="relative">
                            <Image
                              src="/images/massge.png"
                              alt="Logo"
                              width={150}
                              height={150}
                              className="h-full w-full rounded-md object-cover"
                            />
                            <span className="absolute left-0 top-0 p-3 text-lg font-bold text-[#ffffff]">
                              Massager
                            </span>
                            <label className="absolute bottom-4 right-4 flex items-center gap-2">
                              <input
                                type="radio"
                                value="MASSAGER"
                                {...register('role', { required: true })}
                                className="radio radio-primary"
                              />
                            </label>
                          </div>

                          <div className="relative">
                            <Image
                              src="/images/room.png"
                              alt="Logo"
                              width={150}
                              height={150}
                              className="h-full w-full rounded-md object-cover"
                            />
                            <span className="absolute left-0 top-0 p-3 text-lg font-bold text-[#ffffff]">
                              Property Owner
                            </span>
                            <label className="absolute bottom-4 right-4 flex items-center gap-2">
                              <input
                                type="radio"
                                value="PROPERTY_OWNER"
                                {...register('role', { required: true })}
                                className="radio radio-primary"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary disabled:btn-disabled mt-6 text-white"
                    >
                      Register
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
