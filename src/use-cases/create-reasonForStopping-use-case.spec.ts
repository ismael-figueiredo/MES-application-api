import { expect, describe, it, beforeEach } from 'vitest'

import { CreateReasonForStoppingUseCase } from './create-reasonForStopping-use-case'
import { InMemoryReasonForStoppingRepository } from '@/repositories/in-memory/in-memory-reasonsForStopping-repository'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

let inMemoryRepository: InMemoryReasonForStoppingRepository
let sut: CreateReasonForStoppingUseCase

describe('Create reason for stopping Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryReasonForStoppingRepository()
    sut = new CreateReasonForStoppingUseCase(inMemoryRepository)
  })

  it('should be able to create a new reason for stopping', async () => {
    const { reasonForStopping } = await sut.execute({
      name: 'reason name',
    })
    expect(reasonForStopping.id).toEqual(1)
    expect(reasonForStopping.name).toEqual('reason name')
  })

  it('should not be able to create a new reason for stopping with same name', async () => {
    await sut.execute({
      name: 'reason name',
    })

    expect(async () =>
      sut.execute({
        name: 'reason name',
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
