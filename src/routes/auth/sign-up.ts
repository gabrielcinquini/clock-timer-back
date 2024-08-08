import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { db } from "../../lib/prisma";
import { ConflictError } from "../../errors/conflict-error";
import { hashSync } from "bcryptjs";
import { getUserFromAuthorization } from "../../utils";
import { UnauthorizedError } from "../../errors/unauthorized-error";

export async function signUp(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/auth/sign-up', {
    schema: {
      body: z.object({
        fullName: z.string().min(6, 'Mínimo de 6 caracteres'),
        phone: z.string().regex(/^\d{3}-\d{3}$/, 'Formato inválido(123-456)'),
        password: z.string().min(4, 'Mínimo de 4 caracteres'),
        isManager: z.boolean(),
      }),
      headers: z.object({
        authorization: z.string(),
      })
    }
  },
  async (request) => {
    const { authorization } = request.headers
    const currentUser = await getUserFromAuthorization(authorization)
    
    if(currentUser.isManager === false) throw new UnauthorizedError('Você não tem permissão para acessar este recurso')

    const { fullName, phone, password, isManager } = request.body

    const user = await db.user.findUnique({
      where: {
        phone,
      },
    })

    if(user) throw new ConflictError('Usuário já cadastrado')

    await db.user.create({
      data: {
        fullName,
        phone,
        password: hashSync(password, 12),
        isManager,
      }
    })

    return { message: 'Usuário cadastrado com sucesso' }
  })
}
