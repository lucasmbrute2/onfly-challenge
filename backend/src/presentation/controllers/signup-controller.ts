import { AddUser } from '@/src/domain/use-cases/add-user'
import { Controller } from '../protocols/controller'
import { HttpResponse, httpRequest } from '../protocols/http'
import { badRequest, serverError } from '../helpers/http-helper'
import { BadRequestError } from '../errors/bad-request-error'

export class SignUpController implements Controller {
  constructor(private readonly addUser: AddUser) {}

  async handle(request: httpRequest): Promise<HttpResponse> {
    try {
      const { name, username, password } = request.body
      const user = await this.addUser.add({
        name,
        username,
        password,
      })

      if (!user) return badRequest(new BadRequestError('User already exists'))
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
