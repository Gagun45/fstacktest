import { users } from "@repo/shared";

export default async function Home() {
  const res = await fetch("https://fstacktest.onrender.com/api/hello", {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return (
    <div>
      <h1>Homepage</h1>
      <p>{users}</p>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
}
