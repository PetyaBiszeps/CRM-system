export const useUi = () => {
  const ui = reactive({
    mode: 'default' as 'default' | 'compact'
  })

  return {
    ...toRefs(ui)
  }
}