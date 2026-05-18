import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ReduxProvider } from "./ReduxProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider>
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
    </ReduxProvider>
  );
};

export default Providers;
