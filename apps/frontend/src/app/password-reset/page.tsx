'use client';

export default function PasswordResetPagePage() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Password Reset Page</h1>
      <p className="text-muted-foreground mb-6">Form for users to reset their forgotten passwords.</p>
      
      <div className="grid gap-4">
        {users?.map((user: any) => (
          <div key={user.id} className="border rounded p-4">
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
