"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "@/forms/auth/sign-in/SignInForm";
import SignUpForm from "@/forms/auth/sign-up/SignUpForm";
import { useState } from "react";

enum TABS {
  SIGNIN = "signin",
  SIGNUP = "signup",
}

const tabsContentStyles = "mt-4 space-y-4";

const AuthTabs = () => {
  const [tab, setTab] = useState<TABS>(TABS.SIGNIN);
  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as TABS)}
      className=" w-full max-w-md"
    >
      <TabsList className="w-full">
        <TabsTrigger value={TABS.SIGNIN}>Sign In</TabsTrigger>
        <TabsTrigger value={TABS.SIGNUP}>Sign Up</TabsTrigger>
      </TabsList>

      <TabsContent value={TABS.SIGNIN} className={tabsContentStyles}>
        <SignInForm />

        <p className="flex justify-center items-center">
          Don`t have an account?
          <Button
            variant={"link"}
            className="underline"
            onClick={() => setTab(TABS.SIGNUP)}
          >
            Sign Up
          </Button>
        </p>
      </TabsContent>

      <TabsContent value={TABS.SIGNUP} className={tabsContentStyles}>
        <p className="text-center text-muted-foreground font-semibold">
          Please provide your information below
        </p>
        <SignUpForm />
        <p className="flex justify-center items-center">
          Already have an account?
          <Button
            variant={"link"}
            className="underline"
            onClick={() => setTab(TABS.SIGNIN)}
          >
            Sign In
          </Button>
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
