// fixing error window.matchMedia is not a function
import { beforeAll, vi } from 'vitest'

// fix error ReferenceError: visualViewport is not defined
beforeAll(() => {
  Object.defineProperty(window, "visualViewport", {
    value: {
      width: 1024,
      height: 768,
      scale: 1,
      offsetTop: 0,
      offsetLeft: 0,
      pageTop: 0,
      pageLeft: 0,
      addEventListener: () => { },
      removeEventListener: () => { },
    },
    writable: true,
  })
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
