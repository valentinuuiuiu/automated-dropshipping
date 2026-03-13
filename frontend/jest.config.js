
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFiles: ['./src/test-setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  extensionsToTreatAsEsm: ['.ts', '.tsx']
};
