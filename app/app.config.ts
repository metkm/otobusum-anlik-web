export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'neutral',
    },
    dropdownMenu: {
      slots: {
        content: 'ring-muted max-w-(--reka-popper-available-width) max-h-(--reka-popper-available-height) ',
        viewport: 'divide-muted',
        separator: 'bg-(--ui-border-muted)',
      },
    },
    selectMenu: {
      slots: {
        content: 'ring-muted',
      },
    },
    modal: {
      slots: {
        body: 'sm:p-2 p-2',
        title: 'capitalize',
      },
    },
  },
})
