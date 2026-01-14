export const useTheme = () => {
  const mode = useColorMode()

  const isDark = computed(() => {
    return mode.value === 'dark'
  })

  const currentTheme = computed(() => {
    return mode.value
  })

  const preferredTheme = computed(() => {
    return mode.preference
  })

  function toggleTheme() {
    mode.preference = isDark.value ? 'light' : 'dark'
  }

  function setTheme(theme: 'light' | 'dark' | 'system') {
    mode.preference = theme
  }

  return {
    isDark, currentTheme, preferredTheme,
    toggleTheme, setTheme,
  }
}
