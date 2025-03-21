import { pathsToModuleNameMapper } from "ts-jest";
import * as tsConfig from "./tsconfig.json";

export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Ambiente de teste atualizado
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: tsConfig.compilerOptions.paths
    ? pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { prefix: "<rootDir>/" })
    : {},
};
