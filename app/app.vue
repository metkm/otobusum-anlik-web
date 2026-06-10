<template>
  <UApp>
    <main
      data-vaul-drawer-wrapper
      class="w-screen h-svh overflow-hidden flex"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
  </UApp>
</template>

<!-- <style>
.page-enter-active,
.page-leave-active {
  transition-property: transform;
  transition-duration: 400ms;
  transition-timing-function: var(--default-transition-timing-function);
  position: fixed;
  inset: 0;
}

.page-enter-active {
  z-index: 50;
}

.page-leave-to {
  transform: translateX(-50px) translateZ(0);
}

.page-enter-from {
  transform: translateX(100%) translateZ(0);
}
</style> -->
