import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateUser, useUpdateUser, useUsers } from "../hooks/users";
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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserInput>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const { data: users } = useUsers();

  const isEditing = !!editingId;
  const userToEdit = users?.find(u => u.id === editingId);

  useEffect(() => {
    if (userToEdit) reset(userToEdit);
  }, [userToEdit, reset]);

  const onSubmit = (data: UserInput) => {
    if (isEditing && editingId) {
      updateUser.mutate({ id: editingId, data }, {
        onSuccess: () => {
          reset({ name: "", email: "", address: "", birthdate: "" });
          onFinishEdit();
        },
      });
    } else {
      createUser.mutate(data, {
        onSuccess: () => reset({ name: "", email: "", address: "", birthdate: "" }),
      });
    }
  };

  const getInputClass = (error?: string) =>
    `w-full p-3 mb-4 rounded-2xl bg-white/40 backdrop-blur-md border ${
      error ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-300"
    } focus:outline-none focus:ring-2 text-gray-900 placeholder-gray-500 shadow-md sm:text-base md:text-lg transition`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mx-auto transition-all"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
        {isEditing ? "Edit User" : "Add User"}
      </h2>

      <div className="flex flex-col">
        <input {...register("name")} placeholder="Name" className={getInputClass(errors.name?.message)} />
        {errors.name && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.name.message}</p>}

        <input {...register("email")} placeholder="Email" className={getInputClass(errors.email?.message)} />
        {errors.email && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.email.message}</p>}

        <input {...register("address")} placeholder="Address" className={getInputClass(errors.address?.message)} />
        {errors.address && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.address.message}</p>}

        <input {...register("birthdate")} type="date" className={getInputClass(errors.birthdate?.message)} />
        {errors.birthdate && <p className="text-red-500 text-sm -mt-3 mb-4">{errors.birthdate.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          type="submit"
          className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg transition text-sm sm:text-base md:text-lg"
        >
          {isEditing ? "Update" : "Create"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => { reset({ name: "", email: "", address: "", birthdate: "" }); onFinishEdit(); }}
            className="flex-1 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-2xl shadow-lg transition text-sm sm:text-base md:text-lg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default React.memo(UserForm);
