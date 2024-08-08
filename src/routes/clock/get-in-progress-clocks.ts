import { FastifyInstance } from "fastify";
import { db } from "../../lib/prisma";

export async function getInProgressClocks(app: FastifyInstance) {
  app.get('/clocks/in-progress',
  async () => {
    return db.timerTrack.findMany({
      where: {
        endTime: {
          equals: null
        }
      },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        user: {
          select: {
            fullName: true,
            phone: true,
          }
        }
      },
      orderBy: {
        startTime: 'desc'
      }
    })
  })
}
