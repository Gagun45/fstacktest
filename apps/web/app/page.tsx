export default async function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/api/hello`, { next: { revalidate: 15 } });
  const data = await res.json();
  return (
    <div>
      <h1>Homepage</h1>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
}
