export type Review = {
  id: string
  rating: number
  description: string
  createdAt: string
}

export type CreateReviewArgs = {
  id: string
  rating: number
  description: string
}
