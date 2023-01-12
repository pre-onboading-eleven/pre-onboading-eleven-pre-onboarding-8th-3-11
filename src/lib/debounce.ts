const debounceFunction = (callback: (...args: any) => void, delay: number) => {
  let timer: number | undefined;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

export { debounceFunction };
