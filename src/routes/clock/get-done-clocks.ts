import { FastifyInstance } from "fastify";
import { db } from "../../lib/prisma";

export async function getDoneClocks(app: FastifyInstance) {
  app.get('/clocks/done',
  async () => {
    return db.timerTrack.findMany({
      where: {
        endTime: {
          not: null
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
