import fastify from 'fastify'
import cors from '@fastify/cors'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { errorHandler } from './error-handler'
import { signIn, signUp } from './routes/auth'
import { getDoneClocks, getInProgressClocks, getUserInProgressClock, toggleClock } from './routes/clock'
import { getAllUsers } from './routes/get-all-users'

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(signIn)
app.register(signUp)

app.register(toggleClock)
app.register(getDoneClocks)
app.register(getInProgressClocks)
app.register(getUserInProgressClock)

app.register(getAllUsers)

app.listen({ port: process.env.PORT }).then(() => {
  console.log(`server running on ${process.env.API_BASE_URL}`)
})
