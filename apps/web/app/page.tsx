import Loader from "@/components/general/Loader";
import { Suspense } from "react";
import Dashboard from "./_components/Dashboard";

export default async function Home() {
  return (
    <div>
      <h1>Homepage</h1>
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
