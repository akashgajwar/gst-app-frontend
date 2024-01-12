export const isSSR = typeof window === undefined;

const storageMock = {
  getItem: () => {},
  setItem: () => {},
  key: () => {},
};

export const localStorage = !isSSR ? window.localStorage : storageMock;
