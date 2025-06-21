export const formatCategory = (category) => {
  return category
    .replace(/'/g, '')                     // Hilangkan tanda petik
    .split(' ')                            // Pecah per kata
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi
    .join(' ');                            // Gabung lagi
};
