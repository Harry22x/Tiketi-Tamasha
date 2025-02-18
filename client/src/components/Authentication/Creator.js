import LogoutButton from "./LogoutPage";

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">🎉 Event Creator Dashboard</h1>
      <p className="mt-2">Welcome! Here you can create and manage your events.</p>
      
      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
}
