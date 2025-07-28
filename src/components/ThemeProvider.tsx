'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface Theme {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
}

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    presets: { [key: string]: Theme };
}

const defaultTheme: Theme = {
    primary: '#5227FF',
    secondary: '#8B5CF6',
    accent: '#3B82F6',
    background: 'from-slate-900 via-purple-900 to-slate-900',
    surface: 'bg-white/10',
    text: 'text-white',
    textSecondary: 'text-gray-300',
};

const themePresets = {
    default: defaultTheme,
    ocean: {
        primary: '#0EA5E9',
        secondary: '#06B6D4',
        accent: '#0284C7',
        background: 'from-blue-900 via-cyan-900 to-blue-900',
        surface: 'bg-white/10',
        text: 'text-white',
        textSecondary: 'text-blue-200',
    },
    sunset: {
        primary: '#F59E0B',
        secondary: '#F97316',
        accent: '#EF4444',
        background: 'from-orange-900 via-red-900 to-pink-900',
        surface: 'bg-white/10',
        text: 'text-white',
        textSecondary: 'text-orange-200',
    },
    forest: {
        primary: '#10B981',
        secondary: '#059669',
        accent: '#047857',
        background: 'from-green-900 via-emerald-900 to-teal-900',
        surface: 'bg-white/10',
        text: 'text-white',
        textSecondary: 'text-green-200',
    },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, presets: themePresets }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}