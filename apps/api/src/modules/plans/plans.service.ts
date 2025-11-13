import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreatePlanDto, PlanResponseDto, UpdatePlanDto } from '@saas-template/core';
import type { Plan } from '@saas-template/database';
import { PlansRepository } from './plans.repository';

@Injectable()
export class PlansService {
  constructor(
    private readonly plansRepository: PlansRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<PlanResponseDto[]> {
    const plans = await this.plansRepository.findAll(userId);
    return plans.map((plan: Plan) => this.toResponseDto(plan));
  }

  async findOne(id: string, userId: string): Promise<PlanResponseDto> {
    const plan = await this.plansRepository.findById(id, userId);
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }
    return this.toResponseDto(plan);
  }

  async create(userId: string, dto: CreatePlanDto): Promise<PlanResponseDto> {
    return this.uow.execute(async () => {
      const plan = await this.plansRepository.create(userId, dto);
      return this.toResponseDto(plan);
    });
  }

  async update(id: string, userId: string, dto: UpdatePlanDto): Promise<PlanResponseDto> {
    return this.uow.execute(async () => {
      const plan = await this.plansRepository.update(id, userId, dto);
      if (!plan) {
        throw new NotFoundException('Plan not found');
      }
      return this.toResponseDto(plan);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.plansRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Plan not found');
      }
    });
  }

  private toResponseDto(plan: Plan): PlanResponseDto {
    return {
      id: plan.id,
      userId: plan.userId,
      title: plan.title,
      description: plan.description,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    };
  }
}
