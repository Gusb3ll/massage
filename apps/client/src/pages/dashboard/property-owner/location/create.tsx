import React from 'react'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'

import { createProperty, CreatePropertyArgs } from '@/services/property'

const CreateProperty = () => {
  const { data: session, update } = useSession()

  const createPropertyMutation = useMutation({
    mutationFn: (args: CreatePropertyArgs) => createProperty(args),
  })

  const { register, handleSubmit, setValue } = useForm<CreatePropertyArgs>()

  const onCreatePropertySubmit: SubmitHandler<
    CreatePropertyArgs
  > = async args => {
    try {
      if (!session?.user?.id) {
        throw new Error('User not authenticated')
      }
      args.images = args.images ? args.images : []
      args.price = Number(args.price)
      args.rooms = Number(args.rooms)
      args.roomWidth = Number(args.roomWidth)
      args.roomHeight = Number(args.roomHeight)

      await createPropertyMutation.mutateAsync(args)
      await update()
      toast.success('User updated successfully')
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="flex w-full flex-col rounded-lg border p-10 shadow-lg">
          <div className="flex w-full flex-col p-5 sm:flex-row-reverse sm:justify-between">
            <div className="flex w-full flex-col">
              <form
                onSubmit={handleSubmit(onCreatePropertySubmit)}
                className="flex flex-col gap-4"
              >
                <h1 className="text-3xl font-semibold">Room Information</h1>
                <hr />

                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">Name</span>
                  <input
                    type="text"
                    className="input input-bordered bg-white"
                    {...register('name')}
                  />
                </label>
                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">
                    Description
                  </span>
                  <input
                    type="text"
                    className="input input-bordered bg-white"
                    {...register('description')}
                  />
                </label>
                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">
                    Address
                  </span>
                  <input
                    type="text"
                    className="input input-bordered bg-white"
                    {...register('address')}
                  />
                </label>
                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">Images</span>
                  <input
                    type="text"
                    className="input input-bordered bg-white"
                    {...register('images')}
                  />
                </label>
                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">Price</span>
                  <input
                    type="number"
                    className="input input-bordered bg-white"
                    {...register('price')}
                  />
                </label>
                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">Rooms</span>
                  <input
                    type="number"
                    className="input input-bordered bg-white"
                    {...register('rooms')}
                  />
                </label>
                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">
                    RoomWidth
                  </span>
                  <input
                    type="number"
                    className="input input-bordered bg-white"
                    {...register('roomWidth')}
                  />
                </label>
                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">
                    Room Height
                  </span>
                  <input
                    type="number"
                    className="input input-bordered bg-white"
                    {...register('roomHeight')}
                  />
                </label>
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary w-[100px] text-white"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default CreateProperty
