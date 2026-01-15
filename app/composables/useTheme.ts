type Theme = 'system' | 'light' | 'dark'

const icons: Record<Theme, string> = {
  system: 'material-symbols:monitor-outline',
  light: 'material-symbols:light-mode-outline',
  dark: 'material-symbols:nightlight-outline'
}

export const useTheme = () => {
  const mode = useColorMode()
  const cookie = useCookie<Theme>('theme-preference', {
    watch: true
  })

  const currentIcon = computed((): string => {
    const active = (import.meta.server ? cookie.value : mode.preference) ?? 'system'

    return icons[active as Theme] || icons.system
  })

  function toggleTheme() {
    const themes: Theme[] = ['system', 'light', 'dark']

    const index = themes.indexOf(mode.preference as Theme)
    const next = themes[(index + 1) % themes.length] as Theme

    mode.preference = next
    cookie.value = next
  }

  return {
    currentIcon,
    toggleTheme,
    isDarkMode: computed(() => mode.value === 'dark')
  }
}