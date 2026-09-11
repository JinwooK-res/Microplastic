/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FoodConfig {
  name_kr: string;
  value: number; // Concentration value
  unit: "p/g" | "p/L"; // Particles per gram or particles per Liter
  description: string;
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
  | "beverage";

export interface UserIntakes {
  salt: number;
  soy_sauce: number;
  fish_sauce: number;
  salted_seafood: number;
  seaweed: number;
  honey: number;
  beer: number;
  beverage: number;
}

export interface ExposureResult {
  key: FoodKey;
  name_kr: string;
  intake: number;
  unit: "g" | "L";
  concentration: number;
  concentrationUnit: "p/g" | "p/L";
  exposure: number;
  percentage: number;
}
