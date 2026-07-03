export const getCurrentRoleMonths = (startDate) => {
  const [year, month] = startDate.split('-').map(Number);
  const start = new Date(year, month - 1, 1);
  const now = new Date();

  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth()) +
    1;

  return Math.max(months, 1);
};

export const formatLiveDuration = (duration, startDate) => {
  const months = getCurrentRoleMonths(startDate);
  const monthLabel = months === 1 ? '1 month' : `${months} months`;

  return `${duration} (${monthLabel})`;
};
