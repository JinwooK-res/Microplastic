/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FoodConfig {
  name_kr: string;
  name_en: string;
  value: number; // Deterministic arithmetic-mean concentration
  unit: "p/g" | "p/L"; // Particles per gram or particles per Liter
  medianValue: number;
  particleSizeGeomeanUm: number;
  sourceStatistic: "arithmetic mean";
  sourceTable: "Table S14";
  description: string;
  description_en: string;
  defaultVal: number;
  min: number;
  max: number;
  step: number;
}

export type FoodKey = 
  | "salt" 
  | "soy_sauce" 
  | "fish_sauce" 
  | "salted_seafood" 
  | "seaweed" 
  | "honey" 
  | "beer" 
  | "soft_drink"
  | "fruit_drink"
  | "bottled_tea";

export interface UserIntakes {
  salt: number;
  soy_sauce: number;
  fish_sauce: number;
  salted_seafood: number;
  seaweed: number;
  honey: number;
  beer: number;
  soft_drink: number;
  fruit_drink: number;
  bottled_tea: number;
}

export interface ExposureResult {
  key: FoodKey;
  name_kr: string;
  name_en: string;
  intake: number;
  unit: "g" | "L";
  concentration: number;
  concentrationUnit: "p/g" | "p/L";
  exposure: number;
  averageParticleMassMicrograms: number;
  massMicrograms: number;
  percentage: number;
}
