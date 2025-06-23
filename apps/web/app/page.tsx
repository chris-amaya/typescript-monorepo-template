export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to {{ProjectName}}</h1>
      <p className="text-gray-600">{{projectDescription}}</p>
    </main>
  );
}