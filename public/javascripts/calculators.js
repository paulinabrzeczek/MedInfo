function calculateBMI(event) {
    event.preventDefault();
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    if (!height || !weight) return;
  
    const bmi = weight / ((height / 100) ** 2);
    document.getElementById('bmiResult').innerText = 'Wynik BMI: ' + bmi.toFixed(2);
  }
  
  function calculateBMR(event) {
    event.preventDefault();
    const weight = parseFloat(document.getElementById('weightBMR').value);
    const height = parseFloat(document.getElementById('heightBMR').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
  
    if (!weight || !height || !age) return;
  
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  
    document.getElementById('bmrResult').innerText = 'Wynik BMR: ' + bmr.toFixed(2) + ' kcal/dzień';
  }
  