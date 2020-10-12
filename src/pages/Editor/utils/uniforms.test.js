import { getVectorType } from './uniforms';

it('can determine vector type for an array', () => {
  expect(getVectorType([0.1, 0.2])).toEqual('vec2');
  expect(getVectorType([0.1, 0.2, 0.3])).toEqual('unknown vec');
});
