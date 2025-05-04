export const dateOfBirthLogic = () => {
  const yearTemp = new Date().getFullYear();
  
  // Tworzymy tablice lat, miesięcy
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  
  // Funkcja do obliczania liczby dni w miesiącu
  const getDays = (bYear, bMonth) => {
    // Upewnij się, że wartości są liczbami
    const year = parseInt(bYear, 10) || yearTemp;
    const month = parseInt(bMonth, 10) || 1;
    
    return new Date(year, month, 0).getDate();
  };
  
  // Obliczamy początkową liczbę dni
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const initialDaysCount = getDays(currentYear, currentMonth);
  const days = Array.from(new Array(initialDaysCount), (val, index) => 1 + index);
  
  return { years, months, days, getDays };
};