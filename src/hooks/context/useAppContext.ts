import { useContext } from "react";
import { AppContext } from "../../context/appContext";

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppActionsContext must be used within AppActionsProvider",
    );
  }

  return context;
}
