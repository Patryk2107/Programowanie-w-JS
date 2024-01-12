const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
const numbersArr = Array.from({ length: 100 }, () => Math.ceil(Math.random() * 100));

const asyncAdd = async (a, b) => {
	await wait(100);
  return a + b;
};

const asyncSum = async (...arr) => {
	let sum = arr[0];
  let operationsCount = 0;
	for await (const [index, num] of arr.toSpliced(0, 1).entries()) {
  	operationsCount += 1;
  	sum = await asyncAdd(sum, num);
  }
  return ({sum, operationsCount});
};


const masterFunction = async () => {
  performance.mark('mark1');
  const sum = await asyncSum(...numbersArr);
  console.log(sum);
  performance.mark('mark2');
  const measure = performance.measure('test', 'mark1', 'mark2');
  console.log(`czas wykonania: ${(measure.duration/1000).toFixed(3)}s`);
}

masterFunction();