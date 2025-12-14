import nextPlugin from 'eslint-config-next'

const eslintConfig = [
  ...nextPlugin,
  {
    rules: {
      'react-hooks/refs': 'off',
      '@next/next/no-css-tags': 'off',
    },
  },
]

export default eslintConfig
