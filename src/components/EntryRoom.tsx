import { useAuthContext } from "../hooks/context/useAuthContext";
import { useChatsContext } from "../hooks/context/useChatContext";

export const EntryRoom = () => {
  const { currentUser } = useAuthContext();
  const {
    entryChatName,
    entryIsSubmitting,
    handleEntryChatNameChange,
    handleEntrySubmit,
  } = useChatsContext();

  if (!currentUser) return null;

  return (
    <form
      onSubmit={handleEntrySubmit}
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
    >
      <h1 className="mb-4 text-center text-3xl font-bold text-gray-900">
        Join chat
      </h1>

      <p className="mb-4 text-center text-sm text-gray-500">
        Logged in as{" "}
        <span className="font-semibold">{currentUser.userName}</span>
      </p>

      <label className="mb-2 block text-sm font-medium text-gray-500">
        Chat name
      </label>

      <input
        value={entryChatName}
        placeholder="Enter chat name"
        onChange={handleEntryChatNameChange}
        className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-500"
      />

      <button
        type="submit"
        disabled={entryIsSubmitting}
        className="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {entryIsSubmitting ? "Loading..." : "Join Chat"}
      </button>
    </form>
  );
};
