import { useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useThemeStore } from '@/store/themeStore';

function ThemeSync({ children }: { children: React.ReactNode }) {
  const { mode, isDyslexia, isColorblind } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove accessibility classes
    root.classList.remove('colorblind', 'dyslexia');
    
    // Add accessibility modes
    if (isDyslexia) {
      root.classList.add('dyslexia');
    }
    
    if (isColorblind) {
      root.classList.add('colorblind');
    }
  }, [mode, isDyslexia, isColorblind]);

  return <>{children}</>;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <ThemeSync>{children}</ThemeSync>
    </NextThemesProvider>
  );
}
