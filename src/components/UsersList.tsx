import React, { useState } from "react";
import { useUsers, useDeleteUser } from "../hooks/users";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const UserList = ({ onEdit }: { onEdit: (id: string) => void }) => {
  const { data: users, isLoading, isError } = useUsers();
  const deleteUser = useDeleteUser();
  const [search, setSearch] = useState("");

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading users</p>;

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="flex justify-center mb-6">
        <div className="relative w-full sm:w-2/3 lg:w-1/2">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-gray-900 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-40 transition duration-300"
          />
        </div>
      </div>
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredUsers?.map((user) => (
          <div
            key={user.id}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 w-[265px]"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-[200px] object-cover rounded-t-xl"
            />
            <div className="p-5 flex flex-col justify-between h-[180px]">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-800 truncate">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                <p className="text-sm text-gray-500 truncate">{user.address}</p>
                <p className="text-sm text-gray-500">
                  {new Date(user.birthdate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => onEdit(user.id)}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser.mutate(user.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredUsers?.length === 0 && (
          <p className="text-gray-500 col-span-full text-center mt-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserList);
