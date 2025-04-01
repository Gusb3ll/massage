import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { verifyToken } from '@/services/user'

const VerifyEmail = () => {
  const router = useRouter()

  const token = router.query.token as string | undefined

  const verifyTokenMutation = useMutation({
    mutationFn: (t: string) => verifyToken(t),
    onSuccess: () => {
      toast.success('Email verified')
      router.push('/login')
    },
    onError: e => toast.error(e.message),
  })

  useEffect(() => {
    if (token) {
      verifyTokenMutation.mutate(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return <div className="p-8">Loading...</div>
}

export default VerifyEmail
