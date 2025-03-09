import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { UpdateUserArgs, updateUser } from '@/services/user'

const Profile = () => {
  const { data: session, update } = useSession()

  const updateUserMutation = useMutation({
    mutationFn: (args: UpdateUserArgs) => updateUser(args),
  })

  const { register, handleSubmit, setValue } = useForm<UpdateUserArgs>()

  const onUpdateUserSubmit: SubmitHandler<UpdateUserArgs> = async args => {
    try {
      if (args.firstName === session?.user?.firstName) {
        delete args.firstName
      }
      if (args.lastName === session?.user?.lastName) {
        delete args.lastName
      }

      if (args.dateOfBirth === session?.user?.dateOfBirth) {
        delete args.dateOfBirth
      }

      await updateUserMutation.mutateAsync(args)
      update()
      toast.success('User updated successfully')
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  useEffect(() => {
    if (session?.user) {
      setValue('firstName', session.user.firstName)
      setValue('lastName', session.user.lastName)
      setValue('dateOfBirth', session.user.dateOfBirth)
    }
  }, [session?.user, setValue])

  return (
    <AppLayout>
      <DashboardLayout>
        <div>
          <p className="w-full text-4xl font-semibold">Welcome Back.</p>
          <p className="text-base font-normal text-stone-400">
            Let check your proflie
          </p>
        </div>

        <div className="mt-4 flex w-full flex-col rounded-lg border p-10 shadow-lg md:mt-8">
          <h1 className="text-3xl font-semibold">Profile</h1>
          <hr />
          <div className="flex flex-col lg:flex-row">
            <div className="flex w-full flex-col p-5 sm:flex-row-reverse sm:justify-between">
              <div className="mb-6 flex w-full items-center justify-center sm:mb-0">
                {session?.user?.profileImage && (
                  <Image
                    src={session.user.profileImage}
                    alt="Profile Image"
                    width={100}
                    height={100}
                    className="h-20 w-20 rounded-full border-2 border-gray-300 object-cover"
                  />
                )}
              </div>

              <div className="flex w-full flex-col sm:w-2/3">
                <form
                  onSubmit={handleSubmit(onUpdateUserSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="mt-6 flex max-w-md flex-col gap-4 xl:flex-row">
                    <label className="form-control w-full">
                      <span className="label label-text font-semibold">
                        FirstName
                      </span>
                      <input
                        type="text"
                        defaultValue={session?.user.firstName}
                        className="input input-bordered cursor-default select-none bg-white opacity-80"
                        {...register('firstName')}
                      />
                    </label>
                    <label className="form-control w-full">
                      <span className="label label-text font-semibold">
                        LastName
                      </span>
                      <input
                        type="text"
                        defaultValue={session?.user.lastName}
                        className="input input-bordered cursor-default select-none bg-white opacity-80"
                        {...register('lastName')}
                      />
                    </label>
                  </div>
                  <label className="form-control w-full max-w-md">
                    <span className="label label-text font-semibold">
                      Phone number
                    </span>
                    <input
                      type="text"
                      readOnly
                      defaultValue={session?.user.phoneNumber}
                      className="input input-bordered bg-white"
                    />
                  </label>
                  <label className="form-control w-full max-w-md">
                    <span className="label label-text font-semibold">
                      Email
                    </span>
                    <input
                      type="text"
                      defaultValue={session?.user.email}
                      readOnly
                      className="input input-bordered bg-white"
                    />
                  </label>
                  <label className="form-control w-full max-w-md">
                    <span className="label label-text font-semibold">
                      Gender
                    </span>
                    <input
                      type="text"
                      defaultValue={session?.user.gender}
                      readOnly
                      className="input input-bordered bg-white"
                    />
                  </label>
                  <div className="flex w-full max-w-md flex-row justify-between gap-4">
                    <label className="form-control w-full">
                      <span className="label label-text font-semibold">
                        Birthday
                      </span>
                      <input
                        type="date"
                        defaultValue={session?.user.dateOfBirth}
                        className="input input-bordered bg-white"
                        {...register('dateOfBirth')}
                      />
                    </label>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex items-end justify-end p-5 md:mb-3 md:justify-normal md:p-0">
              <button
                type="submit"
                className="btn btn-primary w-[120px] bg-[#854C2F] text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default Profile
