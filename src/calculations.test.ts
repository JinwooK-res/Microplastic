import assert from "node:assert/strict";
import test from "node:test";
import { MP_CONCENTRATION, INITIAL_INTAKES } from "./data";
import {
  averageParticleMassMicrograms,
  calculateExposure,
} from "./calculations";

test("particle mass follows the paper's spherical-particle equation", () => {
  const saltMass = averageParticleMassMicrograms(58.04);
  assert.ok(Math.abs(saltMass - 0.1003244781) < 1e-9);
});

test("paper deterministic defaults reproduce the measured-food subtotal", () => {
  const results = calculateExposure(MP_CONCENTRATION, INITIAL_INTAKES);
  const particles = results.reduce((sum, item) => sum + item.exposure, 0);
  const massMicrograms = results.reduce(
    (sum, item) => sum + item.massMicrograms,
    0,
  );

  assert.ok(Math.abs(particles - 56.13095) < 1e-6);
  assert.ok(Math.abs(massMicrograms - 32.7125997) < 1e-6);
});

test("zero intake produces zero exposure and finite percentages", () => {
  const zeroIntakes = { ...INITIAL_INTAKES };
  for (const key of Object.keys(zeroIntakes) as Array<keyof typeof zeroIntakes>) {
    zeroIntakes[key] = 0;
  }
  const results = calculateExposure(MP_CONCENTRATION, zeroIntakes);

  for (const result of results) {
    assert.equal(result.exposure, 0);
    assert.equal(result.massMicrograms, 0);
    assert.equal(result.percentage, 0);
  }
});
