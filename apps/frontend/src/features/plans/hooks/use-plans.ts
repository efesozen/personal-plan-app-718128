import type { CreatePlanDto, UpdatePlanDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { plansService } from '../services';

const PLAN_KEY = ['plans'];

export function usePlans() {
  return useQuery({
    queryKey: PLAN_KEY,
    queryFn: () => plansService.getAll(),
  });
}

export function usePlan(id: string) {
  return useQuery({
    queryKey: [...PLAN_KEY, id],
    queryFn: () => plansService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlanDto) => plansService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLAN_KEY });
    },
  });
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlanDto }) =>
      plansService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLAN_KEY });
    },
  });
}

export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => plansService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLAN_KEY });
    },
  });
}
