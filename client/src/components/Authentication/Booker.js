//event booker dashboard 

import LogoutButton from "./LogoutPage";

export default function BookerDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">📅 Event Booker Dashboard</h1>
      <p className="mt-2">Welcome! Browse and book exciting events here.</p>

      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
}



