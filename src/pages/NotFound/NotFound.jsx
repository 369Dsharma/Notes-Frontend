
const NotFound = ()=> {
  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-semibold">404 — Page Not Found</h1>
      <p className="text-slate-600 mt-2">The page requested doesn’t exist.</p>
      <a href="/" className="text-blue-600 underline mt-4 inline-block">Go Home</a>
    </main>
  );
}

export default NotFound;