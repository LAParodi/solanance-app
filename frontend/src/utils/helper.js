export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let index = 0; index < Math.min(words.length, 2); index++) {
    initials += words[index][0];
  }

  return initials.toUpperCase();
};

export const addThousandSeparator = (num) => {
  if (num === null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => {
    return {
      month: formatDate(item?.date),
      category: item?.category,
      amount: item?.amount,
    };
  });

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: formatDate(item?.date),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => {
    return {
      month: formatDate(item?.date),
      category: item?.category,
      amount: item?.amount,
    };
  });

  return chartData;
};
