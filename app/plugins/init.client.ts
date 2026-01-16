export default defineNuxtPlugin(async () => {
  const loader = useLoader()

  await new Promise(resolve => setTimeout(resolve, 500))

  loader.value = false
})