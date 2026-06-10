export const exitFade = {
  exit: { scale: 0.9, opacity: 0 },
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
}

const offset = 25

export const slideFadeFromTop = {
  initial: { translateY: -offset, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: -offset, opacity: 0 },
}

export const slideFadeFromBottom = {
  initial: { translateY: offset, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: offset, opacity: 0 },
}

export const slideFadeDownUp = {
  initial: { translateY: -offset, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: offset, opacity: 0 },
}
