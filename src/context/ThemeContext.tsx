'use client'

import { createContext, useState } from 'react';

interface IThemeContext {
  toggle: () => void,
  mode: 'dark' | 'light'
};

export const ThemeContext = createContext<IThemeContext | null>(null)

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [mode, setMode] = useState<'dark' | 'light'>('dark');
  const toggle = () => setMode(prev => prev === 'dark' ? 'light' : 'dark');

    return (
      <ThemeContext.Provider value={{toggle, mode}}>
        <div className={`theme ${mode}`}>{children}</div>
      </ThemeContext.Provider>
    )
}