import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateUser, useUpdateUser, useUser } from "../hooks/users";
import type { UserInput } from "../types/user";

interface UserFormProps {
  editingId?: string | null;
  onFinishEdit: () => void;
}

const schema = yup.object({
  name: yup.string().required("Ismingizni kiriting"),
  email: yup.string().email("To'g'ri email kiriting").required("Emailingizni kiriting"),
  address: yup.string().required("Manzilingizni kiriting"),
  birthdate: yup.string().required("Tug‘ilgan kuningizni kiriting"),
}).required();

const UserForm = ({ editingId, onFinishEdit }: UserFormProps) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UserInput>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const { data: userToEdit } = useUser(editingId || "");

  const isEditing = !!editingId;

  useEffect(() => {
    if (userToEdit) {
      setValue("name", userToEdit.name);
      setValue("email", userToEdit.email);
      setValue("address", userToEdit.address);
      setValue("birthdate", userToEdit.birthdate);
    } else {
      reset({ name: "", email: "", address: "", birthdate: "" });
    }
  }, [userToEdit, editingId, reset, setValue]);

  const onSubmit = (data: UserInput) => {
    if (isEditing && editingId) {
      updateUser.mutate(
        { id: editingId, data },
        { onSuccess: () => { onFinishEdit(); reset(); } }
      );
    } else {
      createUser.mutate(data, { onSuccess: () => reset() });
    }
  };

  const getInputClass = (error?: string) =>
    `w-full p-3 mb-4 rounded-lg shadow-sm border focus:outline-none focus:ring-2 ${
      error ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-400"
    } bg-gray-50 text-gray-900 placeholder-gray-400`;

  return (
    <div className="flex justify-center items-center  min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">{isEditing ? "Edit User" : "Add User"}</h2>

        <div>
          <input {...register("name")} placeholder="Name" className={getInputClass(errors.name?.message)} />
          {errors.name && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.name.message}</p>}

          <input {...register("email")} placeholder="Email" className={getInputClass(errors.email?.message)} />
          {errors.email && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.email.message}</p>}

          <input {...register("address")} placeholder="Address" className={getInputClass(errors.address?.message)} />
          {errors.address && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.address.message}</p>}

          <input {...register("birthdate")} type="date" className={getInputClass(errors.birthdate?.message)} />
          {errors.birthdate && <p className="text-red-500 text-sm -mt-3 mb-4">{errors.birthdate.message}</p>}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition-all shadow-md"
          >
            {isEditing ? "Update" : "Create"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onFinishEdit}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition-all shadow-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default React.memo(UserForm);
