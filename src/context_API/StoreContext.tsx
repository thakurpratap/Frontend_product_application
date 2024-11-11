// store.tsx
import React from "react";
import { SignUpProvider } from "./SignUpContext"; 
import { SignInProvider } from "./SignInContext";

type StoreProps = {
  children: React.ReactNode;
};

const Store = ({ children }: StoreProps) => {
  return (
    <SignUpProvider>
      <SignInProvider>
       
        {children}
       
      </SignInProvider>
    </SignUpProvider>
  );
};

export default Store;
