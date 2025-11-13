import { api } from '@/lib/api';
import type { PlanResponseDto, CreatePlanDto, UpdatePlanDto } from '@saas-template/core';

export const plansService = {
  async getAll(): Promise<PlanResponseDto[]> {
    const response = await api.get('/plans');
    return response.data;
  },

  async getById(id: string): Promise<PlanResponseDto> {
    const response = await api.get(`/plans/${id}`);
    return response.data;
  },

  async create(data: CreatePlanDto): Promise<PlanResponseDto> {
    const response = await api.post('/plans', data);
    return response.data;
  },

  async update(id: string, data: UpdatePlanDto): Promise<PlanResponseDto> {
    const response = await api.put(`/plans/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/plans/${id}`);
  },
};
