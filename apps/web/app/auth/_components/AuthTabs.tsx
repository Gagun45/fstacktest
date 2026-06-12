"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="w-full max-w-md">
      <CardContent className="p-6 space-y-4">
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as TABS)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value={TABS.SIGNIN}>Sign In</TabsTrigger>

            <TabsTrigger value={TABS.SIGNUP}>Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value={TABS.SIGNIN} className={tabsContentStyles}>
            <p className="text-sm text-muted-foreground text-center">
              Welcome back — please sign in to continue
            </p>
            <SignInForm />

            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?
              <Button
                variant="link"
                className="ml-1 p-0"
                onClick={() => setTab(TABS.SIGNUP)}
              >
                Sign up
              </Button>
            </p>
          </TabsContent>

          <TabsContent value={TABS.SIGNUP} className={tabsContentStyles}>
            <p className="text-sm text-muted-foreground text-center">
              Create your account to continue
            </p>

            <SignUpForm />

            <p className="text-sm text-muted-foreground text-center">
              Already have an account?
              <Button
                variant="link"
                className="ml-1 p-0"
                onClick={() => setTab(TABS.SIGNIN)}
              >
                Sign in
              </Button>
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthTabs;
