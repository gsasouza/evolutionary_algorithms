// SHOULD BE EQUAL import { TEST_FUNCTION, DOMAIN } from '../../server/src/evolutiveAlgorithm/contraints';
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

// general purpose: just like linspace in numpy
function linspace(minx, maxx, npts) {
  var xs = [];
  var len = 1.0 * (maxx - minx);
  var dx = len / (npts - 1);
  for (var i = 0; i < npts; i++) {
    xs.push(minx + i * dx);
  }
  return xs;
}

// get the x-coordinates based on the max iteration
function getXs(minx, maxx, m) {
  return linspace(minx, maxx, Math.pow(4, m) * (maxx - minx) + 1.0);
}

const defaultDomain = [0, 100];
const defaultFunction = x =>
  2 * Math.cos(0.39 * x) +
  5 * Math.sin(0.5 * x) +
  0.5 * Math.cos(0.1 * x) +
  10 * Math.sin(0.7 * x) +
  5 * Math.sin(1 * x) +
  5 * Math.sin(0.35 * x);


const weierstrassDomain = [0, 1]
const weierstrassFunction = x => gsum(x, 100);

export const TEST_FUNCTION = weierstrassFunction

export const getCurve = () => getXs(weierstrassDomain[0], weierstrassDomain[1], 4).map(x => ({ name: x, value: TEST_FUNCTION(x) }));
