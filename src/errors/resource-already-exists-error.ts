export class ResourceAlreadyExistsError extends Error {
  constructor() {
    super('Resource already exists.')
  }
}
