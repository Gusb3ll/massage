import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { CreatePropertyArgs, createProperty } from '@/services/property'

const CreateProperty = () => {
  const { data: session, update } = useSession()

  const createPropertyMutation = useMutation({
    mutationFn: (args: CreatePropertyArgs) => createProperty(args),
  })

  const { register, handleSubmit } = useForm<CreatePropertyArgs>()

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
        <div className="">
          <p className="w-full text-4xl font-semibold">
            Match your accommodation with the right guests.
          </p>
          <p className="text-base font-normal text-stone-400">
            All information must provided unless specified as optional.
          </p>
        </div>
        <div className="responsive mt-8 flex w-full flex-col rounded-lg border p-10 shadow-lg">
          <div className="flex w-full flex-col p-5 sm:flex-row-reverse sm:justify-between">
            <div className="flex w-full flex-col">
              <form
                onSubmit={handleSubmit(onCreatePropertySubmit)}
                className="flex flex-col gap-4"
              >
                <h1 className="text-2xl font-semibold md:text-3xl">
                  Room Information
                </h1>
                <hr />
                <div className="flex flex-col gap-3">
                  <label className="form-control w-full max-w-md">
                    <span className="label label-text font-semibold">
                      Location Name
                    </span>
                    <input
                      placeholder="Enter a name"
                      type="text"
                      className="input input-bordered bg-white"
                      {...register('name')}
                    />
                  </label>
                  <div className="flex flex-col gap-5 md:flex-row">
                    <label className="form-control w-full max-w-28">
                      <span className="label label-text font-semibold">
                        Rooms
                      </span>
                      <input
                        placeholder="Room"
                        type="number"
                        className="input input-bordered bg-white"
                        {...register('rooms')}
                      />
                    </label>
                    <div className="flex flex-row gap-5">
                      <label className="form-control w-full max-w-28">
                        <span className="label label-text font-semibold">
                          Room Width
                        </span>
                        <input
                          placeholder="width"
                          type="number"
                          className="input input-bordered bg-white"
                          {...register('roomWidth')}
                        />
                      </label>
                      <label className="form-control w-full max-w-28">
                        <span className="label label-text font-semibold">
                          Room Height
                        </span>
                        <input
                          placeholder="height"
                          type="number"
                          className="input input-bordered bg-white"
                          {...register('roomHeight')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">
                    Location Address
                  </span>
                  <input
                    placeholder="Enter an address"
                    type="text"
                    className="input input-bordered bg-white"
                    {...register('address')}
                  />
                </label>
                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">Images</span>
                  <input
                    placeholder="img"
                    type="text"
                    className="input input-bordered bg-white"
                    {...register('images')}
                  />
                </label>
                <label className="form-control w-full max-w-md">
                  <span className="label label-text font-semibold">
                    Description
                  </span>
                  <input
                    placeholder="Enter a message to customer"
                    type="text"
                    className="input input-bordered bg-white"
                    {...register('description')}
                  />
                </label>
                <div className="flex flex-col md:flex-row md:justify-between">
                  <label className="form-control w-full max-w-28">
                    <span className="label label-text font-semibold">
                      Rent Price
                    </span>
                    <input
                      placeholder="Price"
                      type="number"
                      className="input input-bordered bg-white"
                      {...register('price')}
                    />
                  </label>
                  <div className="flex items-end md:block">
                    <button
                      type="submit"
                      className="btn btn-primary mt-11 w-[120px] bg-[#854C2F] text-white"
                    >
                      Confirm
                    </button>
                  </div>
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
