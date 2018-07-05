import { randomData } from './data-generator';

const taskGenerator = () => ({
  running: true,
  config: {
    ph: 7.5,
    temperature: 20,
  },
});

export const deviceStatus = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      task: taskGenerator(),
      sensors: {
        ph: randomData(9, 2, 100),
        temp: randomData(20, 2, 100),
      },
      motors: {
        motor1: 75.5,
        motor2: 20.5,
      },
    });
  }, 2000);
});

export const deviceFinder = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      host: '192.168.1.65',
      deviceName: 'superToi',
    });
  }, 1000);
});
