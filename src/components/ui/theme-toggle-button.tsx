"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

interface ThemeToggleButtonProps {
    variant?: "circle" | "circle-blur" | "gif" | "polygon"
    start?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
    url?: string
    showLabel?: boolean
    className?: string
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
    variant = "circle-blur",
    start = "top-left",
    url = "",
    showLabel = false,
    className = ""
}) => {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
        )
    }

    const isDark = resolvedTheme === "dark"

    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark"
        console.log('Toggling theme from', resolvedTheme, 'to', newTheme)
        setTheme(newTheme)
        
        // Force immediate DOM update
        setTimeout(() => {
            const html = document.documentElement
            if (newTheme === 'dark') {
                html.classList.add('dark')
                html.classList.remove('light')
            } else {
                html.classList.add('light')
                html.classList.remove('dark')
            }
        }, 0)
    }

    const getStartPosition = () => {
        switch (start) {
            case "top-left":
                return "origin-top-left"
            case "top-right":
                return "origin-top-right"
            case "bottom-left":
                return "origin-bottom-left"
            case "bottom-right":
                return "origin-bottom-right"
            case "center":
                return "origin-center"
            default:
                return "origin-top-left"
        }
    }

    if (variant === "circle-blur") {
        return (
            <div className={`relative ${className}`}>
                <button
                    onClick={toggleTheme}
                    className="relative w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                    title={`Current theme: ${theme}, Click to switch to ${isDark ? 'light' : 'dark'} mode`}
                >
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/80 to-orange-500/80 dark:from-blue-600/80 dark:to-purple-700/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ${getStartPosition()} scale-0 group-hover:scale-100`} />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        {isDark ? (
                            <Moon className="w-5 h-5 text-blue-400 transition-all duration-300 group-hover:text-white" />
                        ) : (
                            <Sun className="w-5 h-5 text-yellow-600 transition-all duration-300 group-hover:text-white" />
                        )}
                    </div>
                </button>
                {showLabel && (
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400">
                        {isDark ? "Dark" : "Light"}
                    </span>
                )}
            </div>
        )
    }

    // Default circle variant
    return (
        <div className={`relative ${className}`}>
            <button
                onClick={toggleTheme}
                className={`relative w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-blue-600 dark:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 ${getStartPosition()}`}
            >
                <div className={`absolute inset-1 rounded-full bg-white dark:bg-gray-900 transition-all duration-500 ${getStartPosition()}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        {isDark ? (
                            <Moon className="w-5 h-5 text-blue-600 transition-all duration-300" />
                        ) : (
                            <Sun className="w-5 h-5 text-yellow-600 transition-all duration-300" />
                        )}
                    </div>
                </div>
            </button>
            {showLabel && (
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400">
                    {isDark ? "Dark" : "Light"}
                </span>
            )}
        </div>
    )
}

export default ThemeToggleButton