const button = document.querySelector("button")
const input1 = document.querySelector("#pole1")
const input2 = document.querySelector("#pole2")
const input3 = document.querySelector("#pole3")
const input4 = document.querySelector("#pole4")

const calc = () => {
	const arrayOfValues = 
  [
  	input1.value,
    input2.value,
    input3.value,
    input4.value
  ].map(value => parseInt(value) || 0)
  const sum = arrayOfValues.reduce((acc, cur) => acc+cur, 0)
  const avg = sum / arrayOfValues.length
  const arr1 = [1,2,3,4]
  const min = Math.min(...arrayOfValues)
  const max = Math.max(...arrayOfValues)
  const results = document.querySelector('#wyniki')
  results.textContent = ""
  
  const sumEl = document.createElement('p')
  sumEl.textContent = `suma: ${sum}`
  const avgEl = document.createElement('p')
  avgEl.textContent = `Srednia: ${avg}`
  const minEl = document.createElement('p')
  minEl.textContent = `min: ${min}`
  const maxEl = document.createElement('p')
  maxEl.textContent = `max: ${max}`
  
  results.append(sumEl, avgEl, minEl, maxEl)
}

input1.addEventListener('input', calc)
input2.addEventListener('input', calc)
input3.addEventListener('input', calc)
input4.addEventListener('input', calc)
button.addEventListener('click', calc)