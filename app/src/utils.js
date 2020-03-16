// SHOULD BE EQUAL import { TEST_FUNCTION, DOMAIN } from '../../server/src/evolutiveAlgorithm/contraints';

export const TEST_FUNCTION = x =>
  2 * Math.cos(0.39 * x) +
  5 * Math.sin(0.5 * x) +
  0.5 * Math.cos(0.1 * x) +
  10 * Math.sin(0.7 * x) +
  5 * Math.sin(1 * x) +
  5 * Math.sin(0.35 * x);

export const DOMAIN = [0, 100];

export const getCurve = () =>
  new Array(DOMAIN[1])
    .fill(null)
    .map((_, index) => ({ name: index, value: TEST_FUNCTION(index) }));
