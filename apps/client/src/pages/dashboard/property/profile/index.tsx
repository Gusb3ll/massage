import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { BsPencil } from 'react-icons/bs'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { uploadAvatar } from '@/services/massager'
import { UpdateUserArgs, updateUser } from '@/services/user'

const Profile = () => {
  const avatarInputRef = useRef<HTMLInputElement>(null)
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

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (avatarInputRef.current) {
        avatarInputRef.current.value = ''
      }

      const uploadAvatarPromise = async () => {
        if (!file) {
          throw new Error('ไม่พบไฟล์ที่ต้องการอัพโหลด')
        }
        // 5MB
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('ไฟล์ที่อัพโหลดต้องมีขนาดไม่เกิน 5MB')
        }
        if (!file.type.match(/^image/)) {
          throw new Error('ชนิดของไฟล์ที่อัพโหลดไม่ถูกต้อง')
        }

        const reader = new FileReader()
        reader.onload = e => {
          const img = document.getElementById('avatar-img') as HTMLImageElement
          if (img && e.target?.result) {
            img.src = e.target.result as string
          }
        }
        reader.readAsDataURL(file)

        await uploadAvatar(file)
        update()
      }

      toast.promise(uploadAvatarPromise(), {
        loading: 'Uploading avatar...',
        success: 'Avatar uploaded',
        error: (e: Error) => e.message,
      })
    }
  }

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
              <div className="flex w-full items-center justify-center gap-4">
                <div className="relative mb-6 aspect-[1/1]">
                  {session?.user?.profileImage && (
                    <Image
                      src={session.user.profileImage}
                      alt="Profile Image"
                      width={100}
                      height={100}
                      className="h-32 w-32 rounded-full border-2 border-gray-300 object-cover"
                    />
                  )}
                  <input
                    type="file"
                    ref={avatarInputRef}
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute bottom-2 right-2 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white bg-gray-300 shadow-lg transition duration-300 hover:scale-105"
                    aria-label="Upload avatar image"
                  >
                    <BsPencil size={18} />
                  </button>
                </div>
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
