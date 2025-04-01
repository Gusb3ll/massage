import Image from 'next/image'

function Verify() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-10 flex w-full max-w-7xl rounded-lg border bg-white shadow-lg">
        <div className="flex w-full flex-col md:flex-row">
          <div className="hidden h-full w-full sm:block md:w-1/2">
            <Image
              src="/images/login.png"
              alt="Login"
              width={1000}
              height={1000}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>

          <div className="flex w-full items-center justify-center md:w-1/2">
            <div className="flex w-full max-w-[400px] flex-col gap-4 p-8">
              <div className="flex justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={90}
                  height={40}
                  className="h-[52px] w-[52px] md:h-[90px] md:w-[90px]"
                />
              </div>

              <h1 className="text-center text-2xl font-bold">
                Please check your email to confirm email.
              </h1>

              <hr className="mt-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verify
