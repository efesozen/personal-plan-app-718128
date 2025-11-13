'use client';

import { usePlans } from '@/features/plans/hooks/use-plans';

export default function PlanDashboardPage() {
  const { data: plans, isLoading } = usePlans();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Plan Dashboard</h1>
      <p className="text-muted-foreground mb-6">Main dashboard where users can view and manage their personal plans.</p>
      
      <div className="grid gap-4">
        {plans?.map((plan: any) => (
          <div key={plan.id} className="border rounded p-4">
            <pre>{JSON.stringify(plan, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
