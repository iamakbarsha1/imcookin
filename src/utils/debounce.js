// exports.debounce = (func, wait) => {
//   let timeout;
//   return function (...args) {
//     const context = this;
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       timeout = null;
//       func.apply(context, args);
//     }, wait);
//   };
// };

exports.debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
