import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsPencil } from 'react-icons/bs'
import { FaPlus, FaUpload } from 'react-icons/fa6'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { uploadAvatar, uploadFile } from '@/services/massager'
import {
  UpdatateMassagerArgs,
  UpdateUserArgs,
  updateMassager,
  updateUser,
} from '@/services/user'

const MassagerAccount = () => {
  const { data: session, update } = useSession()
  const [languages, setLanguages] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])

  const [certificates, setCertificates] = useState<string[]>([])
  const [vaccineCertificates, setVaccineCertificates] = useState<string[]>([])
  const certificatesInputRef = useRef<HTMLInputElement>(null)
  const vaccineCertificatesInputRef = useRef<HTMLInputElement>(null)

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const [profileImage, setProfileImage] = useState<string>(
    '/default-avatar.png',
  )
  const [coverImage, setCoverImage] = useState<string>(
    'https://placehold.co/1500x500',
  )

  const updateMassagerMutation = useMutation({
    mutationFn: (args: UpdatateMassagerArgs) =>
      updateMassager({
        ...args,
        skills,
        languages,
        certificates,
        vaccineCertificates,
        coverImage,
      }),
    onSuccess: () => {
      update()
      toast.success('Massager updated successfully')
    },
    onError: e => toast.error(e.message),
  })

  const {
    register: registerUser,
    handleSubmit: submitUser,
    setValue: setUser,
  } = useForm<UpdateUserArgs>()

  const {
    // register: registerMassager,
    handleSubmit: submitMassager,
    // setValue: setMassager,
  } = useForm<UpdatateMassagerArgs>()

  const updateUserMutation = useMutation({
    mutationFn: (args: UpdateUserArgs) => updateUser(args),
    onSuccess: () => {
      update()
      toast.success('User updated successfully')
    },
    onError: e => toast.error(e.message),
  })

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

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'CERTIFICATE' | 'VACCINE',
  ) => {
    const file = e.target.files?.[0]

    const uploadFilePromise = async () => {
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

      const res = await uploadFile(file)
      if (type === 'CERTIFICATE') {
        setCertificates(prev => [...prev, res.url])
      } else if (type === 'VACCINE') {
        setVaccineCertificates(prev => [...prev, res.url])
      }
    }

    toast.promise(uploadFilePromise(), {
      loading: 'Uploading file...',
      success: 'File uploaded',
      error: (e: Error) => e.message,
    })
  }

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (coverInputRef.current) {
      coverInputRef.current.value = ''
    }

    const uploadFilePromise = async () => {
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

      const res = await uploadFile(file)
      setCoverImage(res.url)
    }

    toast.promise(uploadFilePromise(), {
      loading: 'Uploading cover...',
      success: 'Cover uploaded',
      error: (e: Error) => e.message,
    })
  }

  useEffect(() => {
    if (session?.user?.profileImage) {
      setProfileImage(session.user.profileImage)
      setUser('firstName', session.user.firstName)
      setUser('lastName', session.user.lastName)
      setUser('dateOfBirth', session.user.dateOfBirth)
    }
    if (session?.user?.massager) {
      setLanguages(session.user.massager.languages || [])
      setSkills(session.user.massager.skills || [])
      setCertificates(session.user.massager.certificates || [])
      setVaccineCertificates(session.user.massager.vaccineCertificates || [])
      setCoverImage(session.user.massager.coverImage || '/default-avatar.png')
    }
  }, [session?.user, setUser])

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="w-full rounded-lg border p-8 shadow-lg">
          <form
            onSubmit={submitUser(args => updateUserMutation.mutate(args))}
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
                      {...registerUser('firstName')}
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
                      {...registerUser('lastName')}
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
                    {...registerUser('dateOfBirth')}
                  />
                </label>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="relative mb-6 aspect-[1/1]">
                  <Image
                    id="avatar-img"
                    src={profileImage}
                    alt="avatar"
                    className="h-[200px] w-[200px] rounded-full object-cover object-center"
                    width={256}
                    height={256}
                  />
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
                    className="absolute bottom-2 right-2 flex aspect-[1/1] w-[45px] items-center justify-center rounded-full border border-white/20 bg-gray-300 transition duration-300 hover:scale-95"
                    aria-label="Upload avatar image"
                  >
                    <BsPencil size={20} />
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

        <div className="mt-8 w-full rounded-lg border p-8 shadow-lg">
          <form
            onSubmit={submitMassager(args =>
              updateMassagerMutation.mutate(args),
            )}
            className="flex flex-col gap-8"
          >
            <h1 className="text-3xl font-semibold">Account</h1>
            <hr />
            <div className="flex flex-col gap-4">
              <p className="text-lg">Languages</p>
              <div className="flex gap-4">
                {['Thai', 'English', 'Chinese'].map(language => (
                  <label
                    key={language}
                    className={`flex items-center gap-2 ${languages.includes(language) ? 'text-primary' : ''}`}
                  >
                    <input
                      type="checkbox"
                      value={language}
                      checked={languages.includes(language)}
                      onChange={() =>
                        setLanguages(prev =>
                          prev.includes(language)
                            ? prev.filter(lang => lang !== language)
                            : [...prev, language],
                        )
                      }
                      className="checkbox checkbox-bordered"
                    />
                    <span>{language}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-lg">Skills</p>
              <div className="flex flex-wrap gap-4">
                {[
                  'Thai Massage',
                  'Deep Tissue Massage',
                  'Neck and Shoulder Massage',
                  'Oil Massage',
                  'Office Syndrome Relief Massage',
                  'Foot Massage',
                ].map(skill => (
                  <label
                    key={skill}
                    className={`flex items-center gap-2 ${skills.includes(skill) ? 'text-primary' : ''}`}
                  >
                    <input
                      type="checkbox"
                      value={skill}
                      checked={skills.includes(skill)}
                      onChange={() =>
                        setSkills(prev =>
                          prev.includes(skill)
                            ? prev.filter(s => s !== skill)
                            : [...prev, skill],
                        )
                      }
                      className="checkbox checkbox-bordered"
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>
            <hr />

            <div className="flex flex-col gap-4">
              <input
                type="file"
                ref={certificatesInputRef}
                accept="image/*"
                onChange={e => handleFileUpload(e, 'CERTIFICATE')}
                className="hidden"
              />
              <div className="flex flex-row items-center gap-4">
                <p className="text-xl">Certificates</p>
                <button
                  type="button"
                  onClick={() => certificatesInputRef.current?.click()}
                  className="btn btn-sm bg-primary/80 hover:bg-primary/90 flex w-fit flex-row gap-4 text-white"
                >
                  Upload
                  <FaUpload size="16" />
                </button>
              </div>
              <div className="flex flex-row flex-wrap gap-4">
                {certificates.length > 0 ? (
                  certificates.map((file, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`certificate-${i}`}
                      src={file}
                      className="aspect-video w-[200px] rounded-lg object-cover"
                      alt={`certificate-${i}`}
                      onClick={() => {
                        window.open(file, '_blank')
                      }}
                    />
                  ))
                ) : (
                  <button
                    type="button"
                    onClick={() => certificatesInputRef.current?.click()}
                    className="flex aspect-video h-full w-[200px] items-center justify-center rounded-lg border border-dashed border-gray-600"
                  >
                    <FaPlus size="16" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="file"
                ref={vaccineCertificatesInputRef}
                accept="image/*"
                onChange={e => handleFileUpload(e, 'VACCINE')}
                className="hidden"
              />
              <div className="flex flex-row items-center gap-4">
                <p className="text-xl">Vaccine Certificates</p>
                <button
                  type="button"
                  onClick={() => vaccineCertificatesInputRef.current?.click()}
                  className="btn btn-sm bg-primary/80 hover:bg-primary/90 flex w-fit flex-row gap-4 text-white"
                >
                  Upload
                  <FaUpload size="16" />
                </button>
              </div>
              <div className="flex flex-row flex-wrap gap-4">
                {vaccineCertificates.length > 0 ? (
                  vaccineCertificates.map((file, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`vaccine-${i}`}
                      src={file}
                      className="aspect-video w-[200px] rounded-lg object-cover"
                      alt={`vaccine-${i}`}
                      onClick={() => {
                        window.open(file, '_blank')
                      }}
                    />
                  ))
                ) : (
                  <button
                    type="button"
                    onClick={() => vaccineCertificatesInputRef.current?.click()}
                    className="flex aspect-video h-full w-[200px] items-center justify-center rounded-lg border border-dashed border-gray-600"
                  >
                    <FaPlus size="16" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="file"
                ref={coverInputRef}
                accept="image/*"
                onChange={e => handleCoverUpload(e)}
                className="hidden"
              />
              <div className="flex flex-row items-center gap-4">
                <p className="text-xl">Cover</p>
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="btn btn-sm bg-primary/80 hover:bg-primary/90 flex w-fit flex-row gap-4 text-white"
                >
                  Upload
                  <FaUpload size="16" />
                </button>
              </div>
              {coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverImage}
                  className="aspect-[3/1] w-[500px] rounded-lg object-cover"
                  alt="cover"
                  onClick={() => {
                    window.open(coverImage, '_blank')
                  }}
                />
              )}
            </div>

            <div className="mt-4 flex justify-end lg:mt-7 xl:mt-9 xl:items-end">
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

export default MassagerAccount
