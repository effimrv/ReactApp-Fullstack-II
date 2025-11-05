import { validarEmail } from '../../Utils/Validaciones.js';

describe('validarEmail', () => {
  test('acepta emails con dominios válidos (.cl, .com, .ar)', () => {
    expect(validarEmail('usuario@dominio.cl')).toBe(true);
    expect(validarEmail('user.name@sub.dominio.com')).toBe(true);
    expect(validarEmail('correo@dominio.ar')).toBe(true);
  });

  test('rechaza emails inválidos', () => {
    expect(validarEmail('sin-arroba.com')).toBe(false);
    expect(validarEmail('usuario@dominio')).toBe(false);
    expect(validarEmail('usuario@dominio.')).toBe(false);
    expect(validarEmail('usuario@.com')).toBe(false);
  });
});
