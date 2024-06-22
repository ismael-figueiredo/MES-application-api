export class ResourceAlreadyExistsError extends Error {
  constructor() {
    super('Este recurso já existe.')
  }
}
