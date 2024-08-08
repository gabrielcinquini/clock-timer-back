import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../lib/prisma";
import { getUserFromAuthorization } from "../utils";
import { UnauthorizedError } from "../errors/unauthorized-error";

export async function getAllUsers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/users', {
    schema: {
      headers: z.object({
        authorization: z.string(),
      })
    }
  },
  async (request) => {
    const { authorization } = request.headers

    const currentUser = await getUserFromAuthorization(authorization)
    if(currentUser.isManager === false) throw new UnauthorizedError('Você não tem permissão para acessar este recurso')

    return await db.user.findMany({
      select: {
        id: true,
        fullName: true,
        phone: true,
        isManager: true,
      }
    })
  })
}
