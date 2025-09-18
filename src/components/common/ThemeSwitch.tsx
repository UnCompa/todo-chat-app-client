import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import useDarkMode from "../../hooks/useDarkMode"
function ThemeSwitch() {
  const [isDark, setIsDark] = useDarkMode()

  return (
    <div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsDark(!isDark)}
        className="
          p-2 rounded-lg border transition-colors
          border-slate-300 bg-white text-slate-900
          hover:bg-slate-100
          dark:border-slate-700 dark:bg-slate-900 dark:text-white
          dark:hover:bg-slate-800
        "
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>
    </div>
  )
}

export default ThemeSwitch
