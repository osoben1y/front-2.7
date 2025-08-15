import React, { useState } from "react";
import { useUsers, useDeleteUser } from "../hooks/users";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const UserList = ({ onEdit }: { onEdit: (id: string) => void }) => {
  const { data: users, isLoading, isError } = useUsers();
  const deleteUser = useDeleteUser();
  const [search, setSearch] = useState("");

  if (isLoading) return <p className="text-center text-[#948979]">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading users</p>;

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mb-6">
        <div className="relative w-full sm:w-2/3 lg:w-1/2">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#948979]" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-[#393e46] text-[#dfd0b8] placeholder-[#948979] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#948979] focus:ring-opacity-40 transition duration-300"
          />
        </div>
      </div>

      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredUsers?.map((user) => (
          <div
            key={user.id}
            className="relative bg-[#222831] h-[290px] w-[265px] rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 group"
          >
            <span className="absolute -inset-0.5 rounded-lg bg-[conic-gradient(from_0deg,_#dfd0b8,_#948979,_#393e46,_#dfd0b8)] opacity-0 group-hover:opacity-100 animate-spin-slow pointer-events-none"></span>

            <div className="relative z-10 bg-[#222831] h-full w-full rounded-lg p-3 flex flex-col justify-between">
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-[160px] object-cover rounded-t-lg"
              />
              <div>
                <h3 className="text-base font-bold text-[#dfd0b8] truncate">{user.name}</h3>
                <p className="text-xs text-[#948979] truncate">{user.email}</p>
                <p className="text-xs text-[#948979] truncate">{user.address}</p>
                <p className="text-xs text-[#948979]">
                  {new Date(user.birthdate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit(user.id)}
                  className="flex-1 bg-[#393e46] hover:bg-[#4f5561] text-[#dfd0b8] px-2 py-1 rounded-md text-sm transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser.mutate(user.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md text-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredUsers?.length === 0 && (
          <p className="text-[#948979] col-span-full">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserList);
