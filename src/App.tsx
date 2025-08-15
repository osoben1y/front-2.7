import { useState } from "react";
import UserList from "./components/UsersList";
import UserForm from "./components/UserForm";
import { memo } from "react";

const App = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 p-6 flex flex-col items-center">
      {/* Form section */}
      <div className="w-full max-w-4xl mb-10">
        <UserForm editingId={editingId} onFinishEdit={() => setEditingId(null)} />
      </div>

      {/* Users grid section */}
      <div className="w-full max-w-6xl">
        <UserList onEdit={(id) => setEditingId(id)} />
      </div>
    </div>
  );
};

export default memo(App);
