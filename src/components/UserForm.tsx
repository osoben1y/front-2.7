import React, { useState, useEffect } from "react";
import { useCreateUser, useUpdateUser, useUser } from "../hooks/users";
import type { UserInput } from "../types/user";

interface UserFormProps {
  editingId?: string | null;
  onFinishEdit: () => void;
}

const UserForm = ({ editingId, onFinishEdit }: UserFormProps) => {
  const [form, setForm] = useState<UserInput>({
    name: "",
    email: "",
    address: "",
    birthdate: "",
  });

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const { data: userToEdit } = useUser(editingId || "");

  const isEditing = !!editingId;

  useEffect(() => {
    if (userToEdit) {
      setForm({
        name: userToEdit.name,
        email: userToEdit.email,
        address: userToEdit.address,
        birthdate: userToEdit.birthdate,
      });
    } else if (!editingId) {
      setForm({ name: "", email: "", address: "", birthdate: "" });
    }
  }, [userToEdit, editingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && editingId) {
      updateUser.mutate(
        { id: editingId, data: form },
        {
          onSuccess: () => {
            onFinishEdit();
            setForm({ name: "", email: "", address: "", birthdate: "" });
          },
        }
      );
    } else {
      createUser.mutate(form, {
        onSuccess: () => {
          setForm({ name: "", email: "", address: "", birthdate: "" });
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-[#222831] shadow-lg rounded-xl"
    >
      <h2 className="text-xl font-bold mb-4 text-[#dfd0b8]">
        {isEditing ? "Edit User" : "Add User"}
      </h2>

      <input
        className="border border-[#393e46] bg-[#393e46] text-[#dfd0b8] p-2 w-full mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#948979]"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border border-[#393e46] bg-[#393e46] text-[#dfd0b8] p-2 w-full mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#948979]"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="border border-[#393e46] bg-[#393e46] text-[#dfd0b8] p-2 w-full mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#948979]"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        type="date"
        className="border border-[#393e46] bg-[#393e46] text-[#dfd0b8] p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#948979]"
        value={form.birthdate}
        onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-[#948979] hover:bg-[#a89c8e] text-[#222831] px-4 py-2 rounded-md transition"
        >
          {isEditing ? "Update" : "Create"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onFinishEdit}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default React.memo(UserForm);
