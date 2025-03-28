import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { UpdateUserArgs, updateUser } from '@/services/user'

const UserAccount = () => {
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
        <div className="w-full max-w-xl rounded-lg border p-8 shadow-lg">
          <form
            onSubmit={handleSubmit(args => updateUserMutation.mutate(args))}
            className="flex flex-col gap-4"
          >
            <h1 className="text-3xl font-semibold">Account</h1>
            <hr />
            <div className="flex max-w-3xl flex-col gap-4 sm:flex-row xl:mt-6">
              <label className="form-control w-full">
                <span className="label label-text font-semibold">Name</span>
                <input
                  type="text"
                  defaultValue={session?.user.firstName}
                  className="input input-bordered"
                  {...register('firstName')}
                />
              </label>
              <label className="form-control w-full">
                <span className="label label-text font-semibold">Surname</span>
                <input
                  type="text"
                  defaultValue={session?.user.lastName}
                  className="input input-bordered"
                  {...register('lastName')}
                />
              </label>
            </div>
            <label className="form-control w-full max-w-3xl">
              <span className="label label-text font-semibold">
                Phone Number
              </span>
              <input
                type="text"
                defaultValue={session?.user.phoneNumber}
                className="input input-bordered"
              />
            </label>
            <div className="flex flex-row items-center gap-4">
              <label className="form-control w-full max-w-3xl">
                <span className="label label-text font-semibold">Birthday</span>
                <input
                  type="date"
                  defaultValue={session?.user.dateOfBirth}
                  className="input input-bordered"
                  {...register('dateOfBirth')}
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary bg-primary/80 hover:bg-primary/90 w-full text-white"
            >
              Update
            </button>
          </form>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default UserAccount
