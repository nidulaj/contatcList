export default function Settings() {
  return (
    <div className="absolute top-16 right-6 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
      <h2 className="text-lg font-semibold mb-2">Settings</h2>
      <ul className="space-y-2">
        <li>
          <button className="text-left w-full">Change Password</button>
        </li>
        <li>
          <button className="text-left w-full">Enable 2FA</button>
        </li>
        <li>
          <button className="text-left w-full">Dark Mode</button>
        </li>
      </ul>
    </div>
  );
}
