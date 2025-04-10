export const getLocalStorage = <T>(stored: string) => {
  const storedObject = JSON.parse(localStorage.getItem(`${stored}`) || "[]");
  if (!storedObject) {
    return {} as T;
  }
  return storedObject as T;
};
