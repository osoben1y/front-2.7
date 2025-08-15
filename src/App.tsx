import { useState } from "react";
import UserList from "./components/UsersList";
import UserForm from "./components/UserForm";

export default function App() {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-6">
      <UserForm
        editingId={editingId}
        onFinishEdit={() => setEditingId(null)}
      />
      <hr className="my-6" />
      <UserList onEdit={(id) => setEditingId(id)} />
    </div>
  );
}
