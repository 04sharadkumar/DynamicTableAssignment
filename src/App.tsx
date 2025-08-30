import { useState } from "react";
import { InputField, DataTable, type Column } from "./components";
import { mockUsers, type User } from "./data/mockUsers";

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users] = useState<User[]>(mockUsers);
  const [showAll, setShowAll] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 flex flex-col gap-8">
      <div className="max-w-7xl mx-auto w-full">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
            Dynamic User Directory
          </h1>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            Search, filter, and manage users with our intuitive interface
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
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
                className={`mt-6 p-4 rounded-xl transition-all duration-300 ${
                  search === ""
                    ? "bg-blue-50 border border-blue-100"
                    : filteredUsers.length > 0
                    ? "bg-green-50 border border-green-100"
                    : "bg-red-50 border border-red-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-1 ${search === "" ? "bg-blue-100 text-blue-600" : filteredUsers.length > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`font-medium ${
                        search === ""
                          ? "text-blue-700"
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
                          ? "text-blue-600"
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
            </div>
          </div>

          {/* DataTable Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  User Directory
                </h2>

                <button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1500);
                  }}
                  disabled={loading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-blue-300 disabled:to-indigo-300 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
                  aria-label="Refresh user data"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                        className="h-5 w-5"
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
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-all duration-200 font-medium border border-indigo-100 hover:border-indigo-200"
                  >
                    {showAll ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        Show Less
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        View All ({filteredUsers.length} users)
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} User Directory App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;