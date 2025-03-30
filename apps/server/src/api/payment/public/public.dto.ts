export type StripeWebhook = {
  type: string
  data: {
    object: {
      id: string
      payment_status: string
    }
  }
}
