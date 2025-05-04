import { useMediaQuery } from "react-responsive";

export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleRegisterChange,
  dateError,
}) {
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
      data-testid="dob-select"
    >
      <select
        name="bDay"
        value={bDay}
        onChange={handleRegisterChange}
        aria-label="Day"
      >
        {days && days.map((day) => (
          <option value={day} key={day}>
            {day}
          </option>
        ))}
      </select>
      <select
        name="bMonth"
        value={bMonth}
        onChange={handleRegisterChange}
        aria-label="Month"
      >
        {months && months.map((month) => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </select>
      <select
        name="bYear"
        value={bYear}
        onChange={handleRegisterChange}
        aria-label="Year"
      >
        {years && years.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
}