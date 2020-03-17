function g(x, n) {
  x *= Math.pow(4.0, n);
  const ax = Math.abs(x);
  const fx = Math.floor(ax);
  return Math.pow(3.0 / 4.0, n) * Math.abs(ax - fx - (fx % 2));
}

// given x and m, returns g0(x) + g1(x) + ... + gm(x)
function gsum(x, m) {
  let rslt = 0.0;
  for (let n = 0; n <= m; n++) {
    rslt += g(x, n);
  }
  return rslt;
}

export const weierstrassDomain = [0, 1]
export const weierstrassFunction = x => gsum(x, 100);
