import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <div className="p-8">
      <h1 className="text-center text-2xl font-black">
        You'r Now use Modern Vite App
      </h1>
    </div>
  ),
});
