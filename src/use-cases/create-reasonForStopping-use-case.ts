import { ReasonForStopping } from '@prisma/client'
import { ReasonForStoppingRepository } from '@/repositories/reasonsForStopping-repository'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

interface CreateReasonForStoppingUseCaseRequest {
  name: string
}

interface CreateReasonForStoppingUseCaseResponse {
  reasonForStopping: ReasonForStopping
}
export class CreateReasonForStoppingUseCase {
  constructor(
    private reasonForStoppingRepository: ReasonForStoppingRepository,
  ) {}

  async execute({
    name,
  }: CreateReasonForStoppingUseCaseRequest): Promise<CreateReasonForStoppingUseCaseResponse> {
    const reasonForStoppingWithSameName =
      await this.reasonForStoppingRepository.findByName(name)

    if (reasonForStoppingWithSameName) {
      throw new ResourceAlreadyExistsError()
    }

    const reasonForStopping = await this.reasonForStoppingRepository.create({
      name,
    })
    return { reasonForStopping }
  }
}
