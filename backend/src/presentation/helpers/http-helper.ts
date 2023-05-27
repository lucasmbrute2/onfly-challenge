import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export function badRequest(error: Error): HttpResponse {
  return {
    body: error.message,
    statusCode: 400,
  }
}

export function serverError(error: Error): HttpResponse {
  return {
    body: new ServerError(error?.stack),
    statusCode: 500,
  }
}

export function ok(data: any): HttpResponse {
  return {
    body: data,
    statusCode: 200,
  }
}

export function created(data: any): HttpResponse {
  return {
    body: data,
    statusCode: 201,
  }
}

export function conflict(error: Error): HttpResponse {
  return {
    body: error?.message,
    statusCode: 409,
  }
}
