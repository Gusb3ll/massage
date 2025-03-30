import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import {
  UpdatateMassagerArgs,
  UpdateUserArgs,
  updateMassager,
  updateUser,
} from '@/services/user'

const MassagerAccount = () => {
  const { data: session, update } = useSession()
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [certificates, setCertificates] = useState<File[]>([])
  const [vaccineCertificates, setVaccineCertificates] = useState<File[]>([])
  const [profileImage, setProfileImage] = useState<string>(
    '/default-avatar.png',
  )

  useEffect(() => {
    if (session?.user?.profileImage) {
      setProfileImage(session.user.profileImage)
    }
    if (session?.user?.massager) {
      setSelectedLanguages(session.user.massager.languages || [])
      setSelectedSkills(session.user.massager.skills || [])
    }
  }, [session?.user])

  const updateMassagerMutation = useMutation({
    mutationFn: (args: UpdatateMassagerArgs) => updateMassager(args),
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

  const onUpdateMassagerSubmit: SubmitHandler<
    UpdatateMassagerArgs
  > = async () => {
    try {
      const certificatesUrls = certificates.map(file =>
        URL.createObjectURL(file),
      )
      const vaccineCertificatesUrls = vaccineCertificates.map(file =>
        URL.createObjectURL(file),
      )

      await updateMassagerMutation.mutateAsync({
        languages: selectedLanguages,
        skills: selectedSkills,
        certificates: certificatesUrls,
        vaccineCertificates: vaccineCertificatesUrls,
      })

      if (session?.user?.massager) {
        session.user.massager.certificates = certificatesUrls
        session.user.massager.vaccineCertificates = vaccineCertificatesUrls
      }

      update()
      toast.success('User updated successfully')
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(lang => lang !== language)
        : [...prev, language],
    )
  }

  const handleSkillChange = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill],
    )
  }

  useEffect(() => {
    if (session?.user) {
      setUser('firstName', session.user.firstName)
      setUser('lastName', session.user.lastName)
      setUser('dateOfBirth', session.user.dateOfBirth)
    }
  }, [session?.user, setUser])

  const {
    getRootProps: getRootPropsForCertificates,
    getInputProps: getInputPropsForCertificates,
  } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setCertificates(prev => [...prev, ...acceptedFiles])
    },
    multiple: true,
  })

  const {
    getRootProps: getRootPropsForVaccineCertificates,
    getInputProps: getInputPropsForVaccineCertificates,
  } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setVaccineCertificates(prev => [...prev, ...acceptedFiles])
    },
    multiple: true,
  })

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="w-full rounded-lg border p-8 shadow-lg">
          <form
            onSubmit={submitUser(args => updateUserMutation.mutate(args))}
            className="flex flex-col gap-4"
          >
            <h1 className="text-3xl font-semibold">Profile</h1>
            <hr />
            <div className="flex flex-col justify-between xl:flex-row">
              <div className="flex flex-col-reverse xl:flex-row xl:gap-56">
                <div>
                  <div className="mt-5 flex max-w-3xl flex-col gap-4 sm:flex-row xl:mt-6">
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
                  <label className="form-control w-full max-w-3xl">
                    <span className="label label-text font-semibold">
                      Gender
                    </span>
                    <input
                      type="text"
                      defaultValue={session?.user.gender}
                      readOnly
                      className="input input-bordered bg-white capitalize"
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
                <div className="flex w-full items-center justify-center sm:mb-0">
                  <Image
                    src={profileImage}
                    alt="Avatar"
                    width={256}
                    height={256}
                    className="h-32 w-32 rounded-full border-2 border-gray-300 object-cover"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end lg:mt-7 xl:mt-9 xl:items-end">
                <button
                  type="submit"
                  className="btn btn-primary h-10 w-28 bg-[#8a4724] text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-10 flex w-full flex-col rounded-lg border p-10 shadow-lg">
          <div className="flex w-full flex-col p-5 sm:flex-row-reverse">
            <div className="flex w-full flex-col">
              <form
                onSubmit={submitMassager(onUpdateMassagerSubmit)}
                className="flex flex-col gap-4"
              >
                <h1 className="text-3xl font-semibold">Your skill Detail</h1>
                <hr />

                <h1 className="mt-5 text-xl font-semibold">Languages</h1>
                <div className="flex flex-wrap gap-4">
                  {['Thai', 'English', 'Chinese'].map(language => (
                    <label
                      key={language}
                      className={`flex items-center gap-2 ${selectedLanguages.includes(language) ? 'text-brown-700' : ''}`}
                    >
                      <input
                        type="checkbox"
                        value={language}
                        checked={selectedLanguages.includes(language)}
                        onChange={() => handleLanguageChange(language)}
                        className="checkbox checkbox-bordered"
                      />
                      <span>{language}</span>
                    </label>
                  ))}
                </div>

                <h1 className="mt-5 text-xl font-semibold">Skills</h1>
                <div className="w-full">
                  <div className="flex flex-wrap gap-4">
                    {[
                      'Thai massage',
                      'Deep Tissue Massage',
                      'Neck and Shoulder Massage',
                      'Oil Massage',
                      'Office Syndrome Relief Massage',
                      'Foot Massage',
                    ].map(skill => (
                      <label
                        key={skill}
                        className={`flex items-center gap-2 ${selectedSkills.includes(skill) ? 'text-brown-700' : ''} peer`}
                      >
                        <input
                          type="checkbox"
                          value={skill}
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillChange(skill)}
                          className="checkbox checkbox-bordered"
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <h2 className="text-lg font-semibold">Upload Certificates</h2>
                  <div
                    {...getRootPropsForCertificates()}
                    className="cursor-pointer rounded-md border-2 border-dashed p-5 text-center"
                  >
                    <input {...getInputPropsForCertificates()} />
                    <p>
                      Drag and drop some files here, or click to select files
                      for certificates
                    </p>

                    {certificates.length > 0 &&
                      certificates[0].type.startsWith('image/') && (
                        <Image
                          src={URL.createObjectURL(certificates[0])}
                          alt={certificates[0].name}
                          width={100}
                          height={100}
                          className="mt-2 rounded-md"
                        />
                      )}
                  </div>
                  <div className="mt-3">
                    <h3 className="font-semibold">
                      Uploaded Files (Certificates):
                    </h3>
                    <ul>
                      {certificates.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5">
                  <h2 className="text-lg font-semibold">
                    Upload Vaccine Certificates
                  </h2>
                  <div
                    {...getRootPropsForVaccineCertificates()}
                    className="cursor-pointer rounded-md border-2 border-dashed p-5 text-center"
                  >
                    <input {...getInputPropsForVaccineCertificates()} />

                    <p>
                      Drag and drop some files here, or click to select files
                      for vaccine certificates
                    </p>

                    {vaccineCertificates.length > 0 &&
                      vaccineCertificates[0].type.startsWith('image/') && (
                        <Image
                          src={URL.createObjectURL(vaccineCertificates[0])}
                          alt={vaccineCertificates[0].name}
                          width={100}
                          height={100}
                          className="mt-2 rounded-md"
                        />
                      )}
                  </div>

                  <div className="mt-3">
                    <h3 className="font-semibold">
                      Uploaded Vaccine Certificates:
                    </h3>
                    <ul>
                      {vaccineCertificates.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
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
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default MassagerAccount
