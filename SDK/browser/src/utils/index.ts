export function debounce<T extends any[]>(
  fn: (...args: T) => void,
  delay: number = 1000
): (...args: T) => void {
  let timer: any = null;

  return (...args: T) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(null, args);
    }, delay || 1000);
  };
}
