export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

export const getDifficultyColor = (difficulty) => {
  const colors = {
    Easy: "text-green-600 bg-green-100 dark:bg-green-900/30",
    Medium: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
    Hard: "text-red-600 bg-red-100 dark:bg-red-900/30"
  };
  return colors[difficulty] || colors.Easy;
};