export function useLocalStorage() {
  const store = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  };

  const readStore = (name) => {
    return JSON.parse(localStorage.getItem(name));
  };

  return {
    store,
    readStore,
  };
}
