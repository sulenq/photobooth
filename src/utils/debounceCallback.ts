const debounceCallback = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export default debounceCallback;
