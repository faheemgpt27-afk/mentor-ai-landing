import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

interface ButtonPosition {
  x: number;
  y: number;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  toggleThemeWithAnimation?: (buttonPosition?: ButtonPosition) => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const isInitialMount = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (switchable && !isInitialMount.current) {
      localStorage.setItem("theme", theme);
    }
    isInitialMount.current = false;
  }, [theme, switchable]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  const toggleThemeWithAnimation = (buttonPosition?: ButtonPosition) => {
    if (!switchable) return;

    const currentTheme = theme;
    const newTheme: Theme = currentTheme === "light" ? "dark" : "light";

    if (typeof document.startViewTransition !== "function") {
      setTheme(newTheme);
      return;
    }

    const x = buttonPosition?.x ?? window.innerWidth / 2;
    const y = buttonPosition?.y ?? window.innerHeight / 2;
    
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const direction = newTheme === "light" ? "to-light" : "to-dark";
    document.documentElement.setAttribute("data-theme-direction", direction);

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      const isGoingToLight = newTheme === "light";

      if (isGoingToLight) {
        // Expanding circle - new (light) layer expands over old (dark)
        document.documentElement.animate(
          [
            { clipPath: `circle(0px at ${x}px ${y}px)` },
            { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
          ],
          {
            duration: 700,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      } else {
        // Collapsing circle - old (light) layer shrinks revealing new (dark)
        document.documentElement.animate(
          [
            { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
            { clipPath: `circle(0px at ${x}px ${y}px)` },
          ],
          {
            duration: 700,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-old(root)",
          }
        );
      }
    });

    transition.finished.then(() => {
      document.documentElement.removeAttribute("data-theme-direction");
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, toggleThemeWithAnimation, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}