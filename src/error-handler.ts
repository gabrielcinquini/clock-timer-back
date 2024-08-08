import { FastifyInstance } from "fastify"
import { ClientError } from "./errors/client-error"
import { ZodError } from "zod"
import { UnauthorizedError } from "./errors/unauthorized-error"
import { NotFoundError } from "./errors/notfound-error"
import { ConflictError } from "./errors/conflict-error"

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if(error instanceof ClientError) return reply.status(400).send({ message: error.message })

  if(error instanceof UnauthorizedError) return reply.status(401).send({ message: error.message })
  if(error instanceof NotFoundError) return reply.status(404).send({ message: error.message })
  if(error instanceof ConflictError) return reply.status(409).send({ message: error.message })
  
  if(error instanceof ZodError) return reply.status(400).send({
    message: 'Invalid Input',
    errors: error.flatten().fieldErrors
  })

  return reply.status(500).send({ message: 'Internal server error' })
}
