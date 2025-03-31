import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { UpdateUserArgs, updateUser } from '@/services/user'

const Profile = () => {
  const { data: session, update } = useSession()

  const { register, handleSubmit, setValue } = useForm<UpdateUserArgs>()

  const updateUserMutation = useMutation({
    mutationFn: (args: UpdateUserArgs) => updateUser(args),
    onSuccess: () => {
      update()
      toast.success('User updated successfully')
    },
    onError: e => toast.error(e.message),
  })

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
        <div className="w-full rounded-lg border p-8 shadow-lg">
          <form
            onSubmit={handleSubmit(args => updateUserMutation.mutate(args))}
            className="flex flex-col gap-4"
          >
            <h1 className="text-3xl font-semibold">Account</h1>
            <hr />
            <div className="flex flex-col-reverse lg:flex-row">
              <div className="flex w-full flex-col gap-4">
                <div className="mt-5 flex max-w-3xl flex-col gap-4 sm:flex-row">
                  <label className="form-control w-full">
                    <span className="label label-text font-semibold">
                      FirstName
                    </span>
                    <input
                      type="text"
                      defaultValue={session?.user.firstName}
                      className="input input-[#C5C5C5] input-bordered cursor-default select-none bg-white opacity-80"
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
                      className="input input-[#C5C5C5] input-bordered cursor-default select-none bg-white opacity-80"
                      {...register('lastName')}
                    />
                  </label>
                </div>
                <label className="form-control w-full max-w-3xl">
                  <span className="label label-text font-semibold">
                    Phone number
                  </span>
                  <input
                    type="text"
                    defaultValue={session?.user.phoneNumber}
                    readOnly
                    className="input input-[#C5C5C5] input-bordered bg-white"
                  />
                </label>
                <label className="form-control w-full max-w-3xl">
                  <span className="label label-text font-semibold">Email</span>
                  <input
                    type="text"
                    defaultValue={session?.user.email}
                    readOnly
                    className="input input-bordered bg-white"
                  />
                </label>
                <label className="form-control w-full max-w-3xl">
                  <span className="label label-text font-semibold">Gender</span>
                  <input
                    type="text"
                    defaultValue={session?.user.gender}
                    readOnly
                    className="input input-bordered bg-white"
                  />
                </label>
                <label className="form-control w-full max-w-3xl">
                  <span className="label label-text font-semibold">
                    Birthday
                  </span>
                  <input
                    type="date"
                    defaultValue={session?.user.dateOfBirth}
                    className="input input-[#C5C5C5] input-bordered bg-white"
                    {...register('dateOfBirth')}
                  />
                </label>
              </div>
              <div className="flex w-full items-center justify-center">
                {session?.user?.profileImage && (
                  <Image
                    src={session.user.profileImage}
                    alt="Profile Image"
                    width={100}
                    height={100}
                    className="h-32 w-32 rounded-full border-2 border-gray-300 object-cover"
                  />
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end lg:mt-7">
              <button
                type="submit"
                className="btn btn-primary h-10 w-28 bg-[#8a4724] text-white"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default Profile
