export class BadRequestError extends Error {
  constructor(error: string) {
    super(error)
    this.name = 'Bad Request'
    this.message = error
  }
}
