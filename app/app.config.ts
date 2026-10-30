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
            leadingIcon: 'size-4.5',
            label: 'leading-tight',
          },
          md: {
            label: 'leading-tight',
            base: 'p-2.5',
            leadingIcon: 'size-4.5',
          },
        },
      },
    },
    badge: {
      variants: {
        size: {
          lg: {
            base: 'px-2.5 py-1.5 rounded-sm',
            label: 'font-semibold',
            leadingIcon: 'size-4.5',
          },
          md: {
            base: 'px-2 py-1.5',
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
