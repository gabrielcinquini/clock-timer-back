const ConflictErrorMessages = {
  CONFLICT: 'Conflito',
  USER_ALREADY_REGISTERED: 'Usuário já cadastrado',
} as const

type ConflictErrorMessages = typeof ConflictErrorMessages[keyof typeof ConflictErrorMessages];

export class ConflictError extends Error {
  constructor(message: ConflictErrorMessages) {
    super(message)
    this.name = 'ConflictError'
  }
}