import { expect } from "@playwright/test";

function getEnvVariable(name): string {
    expect(typeof process.env[name], `Environment variable ${name} is not defined`).toBe('string');
    return process.env[name] || '';
  }

export { getEnvVariable }