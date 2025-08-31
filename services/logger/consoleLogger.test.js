const { createLogger } = require('winston');
const figlet = require('figlet');
const boxen = require('boxen');
const { banner, notice, showInfo, showError } = require('./consoleLogger');

jest.mock('winston', () => {
  const infoMock = jest.fn();
  return {
    createLogger: jest.fn(() => ({ info: infoMock })),
    format: { printf: jest.fn() },
    transports: { Console: jest.fn() },
  };
});

jest.mock('boxen', () => ({
  __esModule: true,
  default: jest.fn((msg) => `BOXEN(${msg})`),
}));

jest.mock('figlet', () => ({
  textSync: jest.fn((msg) => `FIGLET(${msg})`),
}));

describe('consoleLogger with mocks', () => {
  let infoMock;

  beforeEach(() => {
    infoMock = createLogger().info;
    jest.clearAllMocks();
  });

  test('banner calls figlet and logs output', () => {
    banner('Test Banner');
    expect(figlet.textSync).toHaveBeenCalledWith('Test Banner', {
      font: 'Standard',
    });
    expect(infoMock).toHaveBeenCalledWith(
      expect.stringContaining('FIGLET(Test Banner)')
    );
  });

  test('notice calls boxen and logs output', () => {
    notice('Test Notice');
    expect(boxen.default).toHaveBeenCalledWith(
      expect.stringContaining('Test Notice'),
      expect.any(Object)
    );
    expect(infoMock).toHaveBeenCalledWith(expect.any(String));
  });

  test('showInfo logs green message', () => {
    showInfo('Test Info');
    expect(infoMock).toHaveBeenCalledWith(
      expect.stringContaining('Test Info'),
      expect.any(Object)
    );
  });

  test('showError logs red message', () => {
    showError('Test Error');
    expect(infoMock).toHaveBeenCalledWith(
      expect.stringContaining('Test Error'),
      expect.any(Object)
    );
  });
});
