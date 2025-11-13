import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Plan } from '@saas-template/database';
import type { CreatePlanDto, UpdatePlanDto } from '@saas-template/core';

@Injectable()
export class PlansRepository extends Repository<Plan> {
  constructor(private dataSource: DataSource) {
    super(Plan, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Plan[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Plan | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreatePlanDto): Promise<Plan> {
    const plan = this.create({
      ...dto,
      userId,
    });
    return this.save(plan);
  }

  async update(id: string, userId: string, dto: UpdatePlanDto): Promise<Plan | null> {
    const plan = await this.findById(id, userId);
    if (!plan) {
      return null;
    }

    Object.assign(plan, dto);
    return this.save(plan);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const plan = await this.findById(id, userId);
    if (!plan) {
      return false;
    }

    await this.softRemove(plan);
    return true;
  }
}
