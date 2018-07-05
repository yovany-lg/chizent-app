import moment from 'moment';

function round(number, precision) {
  const shift = (number, precision, reverseShift) => {
    if (reverseShift) {
      precision = -precision;
    }
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

const randomize = (reference, maxVariation) =>
  ((Math.random() * maxVariation) - (maxVariation / 2)) + reference;

export const randomData = (reference, maxVariation, count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      value: round(randomize(reference, maxVariation), 2),
      timestamp: moment().subtract((count - i) * 2, 'seconds').format('HH:mm:ss'),
    });
  }
  return data;
};

export const randomGenerator = (reference, maxVariation, count) => {
  const labels = [];
  const values = [];
  for (let i = 0; i < count; i++) {
    values.push(round(randomize(reference, maxVariation), 2));
    labels.push(moment().subtract(i * 2, 'seconds').format('HH:mm:ss'));
  }
  return {
    values,
    labels,
  };
};


export const getDefaults = () => {
  const phValues = randomGenerator(8, 1, 100);
  const tempValues = randomGenerator(22, 2, 100);
  return {
    phValues,
    tempValues,
  };
};
