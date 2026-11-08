export type DomainErrorCode = 'NotAuthenticated' | 'NotFound'

export class DomainError extends Error {
  constructor(readonly code: DomainErrorCode) {
    super(code)
    this.name = 'DomainError'
  }
}
