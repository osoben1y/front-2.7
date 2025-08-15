import React, { useState, useMemo } from "react";
import { useUsers, useDeleteUser } from "../hooks/users";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const UserList = ({ onEdit }: { onEdit: (id: string) => void }) => {
  const { data: users, isLoading, isError } = useUsers();
  const deleteUser = useDeleteUser();
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(
    () => users?.filter(user => user.name.toLowerCase().includes(search.toLowerCase())),
    [users, search]
  );

  if (isLoading) return <p className="text-center text-gray-500 mt-10 animate-pulse">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Error loading users</p>;

  return (
    <div className="w-full">
      {/* Search */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-sm sm:text-base md:text-lg"
          />
        </div>
      </div>

      {/* Users grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        {filteredUsers?.map(user => (
          <div
            key={user.id}
            className="relative w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] object-cover rounded-t-3xl"
            />
            <div className="p-5 flex flex-col justify-between h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px]">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{user.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 truncate">{user.email}</p>
                <p className="text-sm sm:text-base text-gray-600 truncate">{user.address}</p>
                <p className="text-sm sm:text-base text-gray-600">{new Date(user.birthdate).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => onEdit(user.id)}
                  className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-medium transition text-sm sm:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser.mutate(user.id)}
                  className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-medium transition text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredUsers?.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-6 text-base sm:text-lg">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserList);
