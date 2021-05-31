export function bmiCalculator(weight, height) {
  return (weight / (height * height)).toFixed(1);
}

export function bmiClassify(bmi) {
  if (bmi < 18.5) return "gầy, thiếu cân";
  else if (bmi >= 18.5 && bmi <= 24.9) return "bình thường";
  else if (bmi >= 25 && bmi <= 29.9) return "thừa cân, tiền béo phì";
  else if (bmi >= 30 && bmi <= 34.9) return "thừa cân, béo phì độ I";
  else if (bmi >= 35 && bmi <= 39.9) return "thừa cân, béo phì độ II";
  else return "thừa cân, béo phì độ III";
}

export function bmrCalculator(weight, height, gender, age) {
  let bmr;
  if (gender === "nam") bmr = 5 + 10 * weight + 6.25 * height * 100 - 5 * age;
  else if (gender === "nữ")
    bmr = 10 * weight + 6.25 * height * 100 - 5 * age - 161;
  return Math.round(bmr);
}

export function tdeeCalculator(bmr, activity) {
  let tdee;
  if (activity === 1) tdee = bmr * 1.2;
  else if (activity === 2) tdee = bmr * 1.375;
  else if (activity === 3) tdee = bmr * 1.55;
  else if (activity === 4) tdee = bmr * 1.7255;
  else tdee = bmr * 1.9;
  return Math.round(tdee);
}
