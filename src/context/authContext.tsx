import {
  createContext,
  useState,
  type ChangeEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { usePostUser } from "../hooks/api/usePostUser";
import { usePostLoginUser } from "../hooks/api/usePostUserLogin";

export type CurrentUser = {
  id: string;
  userName: string;
};

export type authContextType = {
  currentUser: CurrentUser | null;
  authMode: "login" | "register";
  authUserName: string;
  authErrorMessage: string;
  authIsPending: boolean;
  setAuthMode: (mode: "login" | "register") => void;
  setAuthUserName: (value: string) => void;
  handleAuthUserNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRegisterSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  handleLoginSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  clearAuthState: () => void;
  logoutUser: () => void;
};

export const AuthContext = createContext<authContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [authMode, setAuthModeState] = useState<"login" | "register">("login");
  const [authUserName, setAuthUserName] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");

  const { mutateAsync: createUser, isPending: isCreatingUser } = usePostUser();
  const { mutateAsync: loginUser, isPending: isLoggingIn } = usePostLoginUser();

  const authIsPending = isCreatingUser || isLoggingIn;

  const setAuthMode = (mode: "login" | "register") => {
    setAuthModeState(mode);
    setAuthErrorMessage("");
  };

  const handleAuthUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthUserName(e.target.value);
  };

  const handleRegisterSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedUserName = authUserName.trim();
    if (!trimmedUserName) return;

    setAuthErrorMessage("");

    try {
      const user = await createUser({ userName: trimmedUserName });

      setCurrentUser({
        id: user.userId,
        userName: user.username,
      });

      setAuthUserName("");
    } catch (error) {
      console.error("Failed to register:", error);
      setAuthErrorMessage("Failed to create user");
    }
  };

  const handleLoginSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedUserName = authUserName.trim();
    if (!trimmedUserName) return;

    setAuthErrorMessage("");

    try {
      const user = await loginUser({ userName: trimmedUserName });

      setCurrentUser({
        id: user.userId,
        userName: user.username,
      });

      setAuthUserName("");
    } catch (error) {
      console.error("Failed to login:", error);
      setAuthErrorMessage("User not found or login failed");
    }
  };

  const clearAuthState = () => {
    setAuthUserName("");
    setAuthErrorMessage("");
    setAuthModeState("login");
  };

  const logoutUser = () => {
    setCurrentUser(null);
    clearAuthState();
    localStorage.removeItem("chatUser");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authMode,
        authUserName,
        authErrorMessage,
        authIsPending,
        setAuthMode,
        setAuthUserName,
        handleAuthUserNameChange,
        handleRegisterSubmit,
        handleLoginSubmit,
        clearAuthState,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
