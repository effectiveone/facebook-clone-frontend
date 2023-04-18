import { render, screen, fireEvent } from "@testing-library/react";
import DateOfBirthSelect from "./DateOfBirthSelect";

describe("DateOfBirthSelect component", () => {
  const days = ["1", "2", "3", "4", "5"];
  const months = ["January", "February", "March", "April", "May"];
  const years = ["2000", "2001", "2002", "2003", "2004"];

  test("should render DateOfBirthSelect component", () => {
    render(<DateOfBirthSelect days={days} months={months} years={years} />);
    const dateOfBirthSelectComponent = screen.getByTestId("dob-select");
    expect(dateOfBirthSelectComponent).toBeInTheDocument();
  });

  test("should render select options with correct values", () => {
    render(<DateOfBirthSelect days={days} months={months} years={years} />);
    const daySelect = screen.getByLabelText("Day");
    const monthSelect = screen.getByLabelText("Month");
    const yearSelect = screen.getByLabelText("Year");
    expect(daySelect.children).toHaveLength(5);
    expect(monthSelect.children).toHaveLength(5);
    expect(yearSelect.children).toHaveLength(5);
    expect(daySelect.children[0].textContent).toEqual("1");
    expect(monthSelect.children[0].textContent).toEqual("January");
    expect(yearSelect.children[0].textContent).toEqual("2000");
  });

  test("should call handleRegisterChange when select option is changed", () => {
    const handleRegisterChange = jest.fn();
    render(
      <DateOfBirthSelect
        days={days}
        months={months}
        years={years}
        handleRegisterChange={handleRegisterChange}
      />
    );
    const daySelect = screen.getByLabelText("Day");
    fireEvent.change(daySelect, { target: { value: "3" } });
    expect(handleRegisterChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test("should render dateError message when dateError prop is provided", () => {
    render(
      <DateOfBirthSelect
        days={days}
        months={months}
        years={years}
        dateError="Please enter a valid date"
      />
    );
    const error = screen.getByText("Please enter a valid date");
    expect(error).toBeInTheDocument();
  });
});
