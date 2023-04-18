export const dateOfBirthLogic = () => {
  const yearTemp = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = (bYear, bMonth) => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = (bYear, bMonth) =>
    Array.from(new Array(getDays(bYear, bMonth)), (val, index) => 1 + index);

  return { years, months, days, getDays };
};
