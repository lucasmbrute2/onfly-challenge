import { AddUser } from '@/src/domain/use-cases/add-user'
import { Controller } from '../protocols/controller'
import { HttpResponse, httpRequest } from '../protocols/http'
import { badRequest, created, serverError } from '../helpers/http-helper'
import { BadRequestError } from '../errors/bad-request-error'
import { UserView } from '../views/user-view'

export class SignUpController implements Controller {
  constructor(private readonly addUser: AddUser) {}

  async handle(request: httpRequest): Promise<HttpResponse> {
    try {
      const { name, username, password } = request.body
      const userCreated = await this.addUser.add({
        name,
        username,
        password,
      })

      if (!userCreated)
        return badRequest(new BadRequestError('User already exists'))

      return created(UserView.toHttp(userCreated))
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
