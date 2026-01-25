// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([{
  rules: {
    '@stylistic/eol-last': ['error', 'never'],
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/brace-style': ['error', '1tbs', {
      allowSingleLine: true
    }],

    'vue/attributes-order': ['error', {
      order: [
        'CONDITIONALS', // v-if, v-else
        'LIST_RENDERING', // v-for
        'TWO_WAY_BINDING', // v-model
        'OTHER_DIRECTIVES', // v-click-outside
        'RENDER_MODIFIERS', // v-once
        'CONTENT', // v-html, v-text
        'DEFINITION', // :is
        'UNIQUE', // :ref, :key
        'GLOBAL', // :id
        'OTHER_ATTR', // :name, :type, :placeholder, :disabled, :readonly, :autocomplete, :model-value, :class, :style
        'EVENTS' // @click, @focus
      ]
    }]
  }
}])