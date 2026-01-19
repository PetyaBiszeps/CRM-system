export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding) {
      el.clickOutside = (event: Event) => {
        if (el.contains(event.target)) {
          return
        }
        else {
          binding.value(event)
        }
      }

      document.addEventListener('click', el.clickOutside, {
        capture: true
      })
    },

    unmounted(el) {
      document.removeEventListener('click', el.clickOutside, {
        capture: true
      })
      delete el.clickOutside
    }
  })
})