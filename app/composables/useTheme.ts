export const useTheme = () => {
  const mode = useColorMode()

  const isDark = computed(() => {
    return mode.value === 'dark'
  })

  const currentTheme = computed(() => {
    return mode.value
  })

  const currentIcon = computed(() => {
    if (mode.preference === 'system') {
      return 'material-symbols:monitor-outline'
    }

    return isDark.value ? 'material-symbols:nightlight-outline' : 'material-symbols:light-mode-outline'
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
    isDark, currentTheme, currentIcon, preferredTheme,
    toggleTheme, setTheme
  }
}