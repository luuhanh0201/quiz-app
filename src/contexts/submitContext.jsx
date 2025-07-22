import { createContext, useContext } from "react";

export const SubmitContext = createContext({
  triggerSubmit: () => {}
});

export const useSubmitContext = () => useContext(SubmitContext);
