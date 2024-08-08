import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { db } from "../../lib/prisma";
import { getUserFromAuthorization } from "../../utils";

export async function toggleClock(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/clock/toggle-clock', {
    schema: {
      headers: z.object({
        authorization: z.string(),
      })
    }
  },
  async (request) => {
    const { authorization } = request.headers

    const currentUser = await getUserFromAuthorization(authorization)

    const isClockRunning = await db.timerTrack.findFirst({
      where: {
        userId: currentUser.id,
        endTime: null
      }
    })

    if(!isClockRunning) {
      await db.timerTrack.create({
        data: {
          userId: currentUser.id,
          startTime: new Date(),
        }
      })

      return { message: 'Ponto registrado com sucesso' }
    }
    
    await db.timerTrack.update({
      where: {
        id: isClockRunning.id
      },
      data: {
        endTime: new Date()
      }
    })

    return { message: 'Ponto finalizado com sucesso' }
  })
}
