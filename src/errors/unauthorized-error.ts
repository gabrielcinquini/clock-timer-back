const UnauthorizedErrorMessages = {
  UNAUTHORIZED: 'Você não tem permissão para acessar este recurso',
} as const

type UnauthorizedErrorMessages = typeof UnauthorizedErrorMessages[keyof typeof UnauthorizedErrorMessages];

export class UnauthorizedError extends Error {
  constructor(message: UnauthorizedErrorMessages) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}