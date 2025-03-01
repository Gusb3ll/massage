// import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
// import { DefaultSeo } from 'next-seo'

// import { seoOptions, useIsProd } from '@/utils'

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  //   const isProd = useIsProd()

  return (
    <>
      {/* <DefaultSeo {...seoOptions} /> */}
      {/* {isProd && (
        <>
          <GoogleAnalytics gaId="G-3PN6NBX70B" />
          <GoogleTagManager gtmId="GTM-TMT98K73" />
        </>
      )} */}
      {children}
    </>
  )
}

export default AppLayout
