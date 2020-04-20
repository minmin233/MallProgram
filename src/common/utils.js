export function debounce(func, delay){
  let timer = null
  // ...可以传几个参数
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}