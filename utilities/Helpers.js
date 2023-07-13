function generateConsecutiveDates(initialDate, noOfDays) {
  const dates = [];
  const startDate = new Date(initialDate);

  for (let i = 0; i < noOfDays; i++) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    dates.push(currentDate.toISOString().slice(0, 10));
  }

  return dates;
}

function generateDatesInRange(startDate, endDate) {
  const dates = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    dates.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export { generateConsecutiveDates, generateDatesInRange };
