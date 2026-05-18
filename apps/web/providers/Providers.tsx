import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
};

export default Providers;
