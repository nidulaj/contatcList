import React from 'react'

export default function Settings() {
  const [twoFA, setTwoFA] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <div className="absolute top-16 right-6 bg-white shadow-lg rounded-lg p-4 w-80 z-50">
      <h2 className="text-lg font-semibold mb-4 text-indigo-600">Settings</h2>
      <ul className="space-y-3">
        <li>
          <button
            className="text-left w-full px-3 py-2 rounded-md transition duration-200 hover:opacity-80 hover:scale-[1.01] text-gray-800"
          >
            Export Contacts
          </button>
        </li>
        <li className="flex justify-between items-center px-3 py-2 rounded-md hover:opacity-80 hover:scale-[1.01] transition">
          <span className="text-gray-800">Two-Factor Authentication</span>
          <button
            onClick={() => setTwoFA(!twoFA)}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300 ${
              twoFA ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                twoFA ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </li>
        <li className="flex justify-between items-center px-3 py-2 rounded-md hover:opacity-80 hover:scale-[1.01] transition">
          <span className="text-gray-800">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300 ${
              darkMode ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </li>
      </ul>
    </div>
  );
}
