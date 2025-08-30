import { useState } from "react";
import { InputField, DataTable, type Column } from "./components";
import { mockUsers, type User } from "./data/mockUsers";

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users] = useState<User[]>(mockUsers);
  const [showAll, setShowAll] = useState(false); // ✅ state for toggle

  
  const columns: Column<User>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  
  const displayedUsers = showAll ? filteredUsers : filteredUsers.slice(0, 5);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex flex-col gap-8">
      <div className="max-w-6xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Dynamic Table
          </h1>
          <p className="text-gray-500 mt-2">
            Search, filter, and manage users with our intuitive interface
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-blue-200 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Search & Filters
              </h2>

              <InputField
                placeholder="Type a name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                size="md"
                clearable
                aria-label="Search users by name"
              />

              <div
                className={`mt-6 p-4 rounded-lg ${
                  search === ""
                    ? "bg-gray-50"
                    : filteredUsers.length > 0
                    ? "bg-green-50"
                    : "bg-red-50"
                }`}
              >
                <h3
                  className={`font-medium ${
                    search === ""
                      ? "text-gray-700"
                      : filteredUsers.length > 0
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  Search Results
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    search === ""
                      ? "text-gray-600"
                      : filteredUsers.length > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {search === ""
                    ? "Type a name to search users"
                    : filteredUsers.length > 0
                    ? `Found ${filteredUsers.length} user${
                        filteredUsers.length !== 1 ? "s" : ""
                      } matching your search`
                    : "No users found"}
                </p>
              </div>
            </div>
          </div>

          {/* DataTable Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-blue-200 rounded-2xl shadow-lg p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 sm:mb-0">
                  User Directory
                </h2>

                <button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1500);
                  }}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-blue-300 text-white rounded-lg transition-all duration-200"
                  aria-label="Refresh user data"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 
                            5.373 0 12h4zm2 5.291A7.962 7.962 0 
                            014 12H0c0 3.042 1.135 5.824 3 
                            7.938l3-2.647z"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 
                            0 004.582 9m0 0H9m11 11v-5h-.581m0 
                            0a8.003 8.003 0 01-15.357-2m15.357 
                            2H15"
                        />
                      </svg>
                      Refresh Data
                    </>
                  )}
                </button>
              </div>

              {/* Table */}
              <DataTable<User>
                data={displayedUsers}
                columns={columns}
                loading={loading}
                selectable
                onRowSelect={(rows) => console.log("Selected rows:", rows)}
              />

              {/* Show More / Show Less Button */}
              {filteredUsers.length > 5 && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-sm px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                  >
                    {showAll ? "Show Less" : "Show All"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
