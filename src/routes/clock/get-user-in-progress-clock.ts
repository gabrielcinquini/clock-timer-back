import { FastifyInstance } from "fastify";
import { db } from "../../lib/prisma";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { getUserFromAuthorization } from "../../utils";

export async function getUserInProgressClock(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/clock/in-progress', {
    schema: {
      headers: z.object({
        authorization: z.string(),
      })
    }
  },
  async (request) => {
    const { authorization } = request.headers

    const currentUser = await getUserFromAuthorization(authorization)

    return await db.timerTrack.findFirst({
      where: {
        userId: currentUser.id,
        endTime: null
      }
    })
  })
}
