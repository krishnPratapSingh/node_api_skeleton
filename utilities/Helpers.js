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

function converDateToYyyyMmDd(dateString) {
  // Split the string into individual dates based on the comma separator
  const dateArray = dateString.split(",");

  // Loop through each date string and convert it to a JavaScript Date object
  const parsedDates = dateArray.map((dateStr) => {
    // Decode the URI-encoded date string
    const decodedDateStr = decodeURIComponent(dateStr);

    // Parse the decoded date string into a Date object
    const dateObj = new Date(decodedDateStr);

    return dateObj;
  });
  return parsedDates;
}

function mapIntegersToMonthNames(X) {
  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const Y = X.map((num) => monthNames[num]);

  return Y;
}

export {
  generateConsecutiveDates,
  generateDatesInRange,
  converDateToYyyyMmDd,
  mapIntegersToMonthNames,
};
