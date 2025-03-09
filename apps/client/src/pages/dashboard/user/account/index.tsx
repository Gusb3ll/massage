import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { UpdateUserArgs, updateUser } from '@/services/user'

const Useraccount = () => {
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
        <div className="w-full rounded-lg border p-10 shadow-lg">
          <form
            onSubmit={handleSubmit(onUpdateUserSubmit)}
            className="flex flex-col gap-4"
          >
            <h1 className="text-3xl font-semibold">Profile</h1>
            <hr />
            <div className="mt-6 flex max-w-md flex-col gap-4 sm:flex-row">
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
                <span className="label label-text font-semibold">LastName</span>
                <input
                  type="text"
                  defaultValue={session?.user.lastName}
                  className="input input-[#C5C5C5] input-bordered cursor-default select-none bg-white opacity-80"
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
                defaultValue={session?.user.phoneNumber}
                readOnly
                className="input input-[#C5C5C5] input-bordered bg-white"
              />
            </label>
            <div className="flex w-full max-w-md flex-row items-center gap-4">
              <label className="form-control w-full">
                <span className="label label-text font-semibold">Birthday</span>
                <input
                  type="date"
                  defaultValue={session?.user.dateOfBirth}
                  className="input input-[#C5C5C5] input-bordered bg-white"
                  {...register('dateOfBirth')}
                />
              </label>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="btn btn-primary w-[100px] text-white"
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

export default Useraccount
