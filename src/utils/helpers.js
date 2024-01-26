export const isSSR = typeof window === undefined;

const storageMock = {
  getItem: () => {},
  setItem: () => {},
  key: () => {},
};

export function loadScript(url) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const localStorage = !isSSR ? window.localStorage : storageMock;
