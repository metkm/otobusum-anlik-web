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
          class: 'p-2.5',
        },
      ],
      variants: {
        size: {
          lg: {
            base: 'p-3',
            leadingIcon: 'size-4.5',
          },
          md: {
            label: 'leading-tight text-[0.750rem]',
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
            base: 'px-3 py-2 rounded-sm',
            label: 'font-semibold',
            leadingIcon: 'size-4.5',
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
