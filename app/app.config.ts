export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'neutral',
    },
    button: {
      compoundVariants: [
        {
          square: true,
          size: 'lg',
          class: 'p-3.5',
        },
        {
          square: false,
          size: 'md',
          class: 'p-2.5',
        },
      ],
    },
    input: {
      variants: {
        size: {
          md: {
            base: 'p-3',
          },
        },
      },
    },
  },
})
