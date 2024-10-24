import { Calculator } from '@/components/Calculator';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              DeFi Points Calculator
            </h1>
            <p className="text-sm text-muted-foreground md:text-base lg:text-lg">
              Calculate project points based on specific criteria
            </p>
          </header>
          <Calculator />
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}