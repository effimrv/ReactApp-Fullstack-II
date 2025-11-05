import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configuración global para Testing Library
configure({
  testIdAttribute: 'data-testid'
});

// Polyfills para testing
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
