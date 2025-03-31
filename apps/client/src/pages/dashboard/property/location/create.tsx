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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePropertyArgs>()

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
        <div className="w-full rounded-lg border p-8 shadow-lg">
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
                      {...register('name', {
                        required: 'Location name is required',
                      })}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
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
                        {...register('rooms', {
                          required: 'rooms is required',
                        })}
                      />
                      {errors.rooms && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.rooms && (
                            <p className="text-sm text-red-500">
                              {errors.rooms.message}
                            </p>
                          )}
                        </p>
                      )}
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
                          {...register('roomWidth', {
                            required: 'Room width is required',
                          })}
                        />
                        {errors.roomWidth && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.roomWidth.message}
                          </p>
                        )}
                      </label>
                      <label className="form-control w-full max-w-28">
                        <span className="label label-text font-semibold">
                          Room Height
                        </span>
                        <input
                          placeholder="height"
                          type="number"
                          className="input input-bordered bg-white"
                          {...register('roomHeight', {
                            required: 'Room height is required',
                          })}
                        />
                        {errors.roomHeight && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.roomHeight.message}
                          </p>
                        )}
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
                    {...register('address', {
                      required: 'Address is required',
                    })}
                  />
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
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
                    {...register('description', {
                      required: 'description is required',
                    })}
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
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
                      {...register('price', {
                        required: 'price is required',
                      })}
                    />
                    {errors.price && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.price.message}
                      </p>
                    )}
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
