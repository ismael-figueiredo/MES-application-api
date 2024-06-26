import { Prisma, ReasonForScrap } from '@prisma/client'

export interface ReasonForScrapRepository {
  create(
    data: Prisma.ReasonForScrapUncheckedCreateInput,
  ): Promise<ReasonForScrap>
  update(
    id: number,
    data: Prisma.ReasonForScrapUncheckedUpdateInput,
  ): Promise<ReasonForScrap>
  delete(id: number): Promise<void>
  searchMany(query: string, page: number): Promise<ReasonForScrap[]>
  findById(id: number): Promise<ReasonForScrap | null>
  findByName(name: string): Promise<ReasonForScrap | null>
}
