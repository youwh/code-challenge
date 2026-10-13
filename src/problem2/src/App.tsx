import { SwapForm } from './components/SwapForm';

export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <main className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl">
        <h1 className="mb-2 text-lg font-semibold">Swap</h1>
        <SwapForm />
      </main>
    </div>
  );
}
