import { FoodConfig, FoodKey, UserIntakes, ExposureResult } from "./types";

export const DEFAULT_MP_DENSITY_G_PER_ML = 0.98;

export function averageParticleMassMicrograms(
  particleSizeGeomeanUm: number,
  densityGPerMl = DEFAULT_MP_DENSITY_G_PER_ML,
): number {
  return (
    (Math.PI * particleSizeGeomeanUm ** 3 * densityGPerMl) /
    (6 * 1e12)
  ) * 1e6;
}

export function calculateExposure(
  configs: Record<FoodKey, FoodConfig>,
  intakes: UserIntakes,
): ExposureResult[] {
  const calculated = (Object.keys(configs) as FoodKey[]).map((key) => {
    const config = configs[key];
    const intake = intakes[key];
    const exposure = config.value * intake;
    const particleMass = averageParticleMassMicrograms(
      config.particleSizeGeomeanUm,
    );

    return {
      key,
      name_kr: config.name_kr,
      name_en: config.name_en,
      intake,
      unit: config.unit === "p/g" ? ("g" as const) : ("L" as const),
      concentration: config.value,
      concentrationUnit: config.unit,
      exposure,
      averageParticleMassMicrograms: particleMass,
      massMicrograms: exposure * particleMass,
      percentage: 0,
    };
  });

  const totalExposure = calculated.reduce((sum, item) => sum + item.exposure, 0);
  return calculated.map((item) => ({
    ...item,
    percentage: totalExposure > 0 ? (item.exposure / totalExposure) * 100 : 0,
  }));
}

