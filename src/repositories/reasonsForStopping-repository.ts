import { Prisma, ReasonForStopping } from '@prisma/client'

export interface ReasonForStoppingRepository {
  create(
    data: Prisma.ReasonForStoppingUncheckedCreateInput,
  ): Promise<ReasonForStopping>
  update(
    id: number,
    data: Prisma.ReasonForStoppingUncheckedUpdateInput,
  ): Promise<ReasonForStopping>
  delete(id: number): Promise<void>
  searchMany(query: string, page: number): Promise<ReasonForStopping[]>
  findById(id: number): Promise<ReasonForStopping | null>
  findByName(name: string): Promise<ReasonForStopping | null>
}
