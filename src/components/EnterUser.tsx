import { useAuthContext } from "../hooks/context/useAuthContext";

export const EnterUser = () => {
  const {
    authMode,
    authUserName,
    authErrorMessage,
    authIsPending,
    setAuthMode,
    handleAuthUserNameChange,
    handleLoginSubmit,
    handleRegisterSubmit,
  } = useAuthContext();

  return (
    <form
      onSubmit={authMode === "login" ? handleLoginSubmit : handleRegisterSubmit}
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
    >
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Online Chat
      </h1>

      <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => setAuthMode("login")}
          className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
            authMode === "login"
              ? "bg-white text-gray-900 shadow"
              : "text-gray-500"
          }`}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => setAuthMode("register")}
          className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
            authMode === "register"
              ? "bg-white text-gray-900 shadow"
              : "text-gray-500"
          }`}
        >
          Register
        </button>
      </div>

      <label className="mb-2 block text-sm font-medium text-gray-500">
        Username
      </label>

      <input
        value={authUserName}
        placeholder="Enter your username"
        onChange={handleAuthUserNameChange}
        className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-500"
      />

      {authErrorMessage && (
        <p className="mb-4 text-sm text-red-500">{authErrorMessage}</p>
      )}

      <button
        type="submit"
        disabled={authIsPending}
        className="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {authIsPending
          ? "Loading..."
          : authMode === "login"
            ? "Login"
            : "Register"}
      </button>
    </form>
  );
};
