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
          class: 'p-3',
        },
        {
          square: true,
          size: 'md',
          class: 'p-2',
        },
      ],
      variants: {
        size: {
          lg: {
            base: 'p-3',
            icon: 'size-4.5',
          },
          md: {
            base: 'p-2.5',
            icon: 'size-4',
          },
        },
      },
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
