import { render, screen, fireEvent } from "@testing-library/react";
import DateOfBirthSelect from "./DateOfBirthSelect";

describe("DateOfBirthSelect component", () => {
  const testDays = [1, 2, 3, 4, 5];
  const testMonths = [1, 2, 3, 4, 5];
  const testYears = [2000, 2001, 2002, 2003, 2004];
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    mockHandleChange.mockClear();
  });

  test("powinien renderować komponent DateOfBirthSelect", () => {
    render(
      <DateOfBirthSelect 
        days={testDays} 
        months={testMonths} 
        years={testYears}
        bDay={1}
        bMonth={1}
        bYear={2000}
        handleRegisterChange={mockHandleChange}
      />
    );
    
    const dateOfBirthSelectComponent = screen.getByTestId("dob-select");
    expect(dateOfBirthSelectComponent).toBeInTheDocument();
  });

  test("powinien renderować opcje select z poprawnymi wartościami", () => {
    render(
      <DateOfBirthSelect 
        days={testDays} 
        months={testMonths} 
        years={testYears}
        bDay={1}
        bMonth={1}
        bYear={2000}
        handleRegisterChange={mockHandleChange}
      />
    );
    
    const daySelect = screen.getByLabelText("Day");
    const monthSelect = screen.getByLabelText("Month");
    const yearSelect = screen.getByLabelText("Year");
    
    expect(daySelect.children).toHaveLength(5);
    expect(monthSelect.children).toHaveLength(5);
    expect(yearSelect.children).toHaveLength(5);
    
    expect(daySelect.children[0].textContent).toBe("1");
    expect(monthSelect.children[0].textContent).toBe("1");
    expect(yearSelect.children[0].textContent).toBe("2000");
  });

  test("powinien wywołać handleRegisterChange przy zmianie opcji select", () => {
    render(
      <DateOfBirthSelect 
        days={testDays} 
        months={testMonths} 
        years={testYears}
        bDay={1}
        bMonth={1}
        bYear={2000}
        handleRegisterChange={mockHandleChange}
      />
    );
    
    const daySelect = screen.getByLabelText("Day");
    const monthSelect = screen.getByLabelText("Month");
    const yearSelect = screen.getByLabelText("Year");
    
    // Zmień dzień
    fireEvent.change(daySelect, { target: { value: "3" } });
    expect(mockHandleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ name: "bDay", value: "3" })
    }));
    
    // Zmień miesiąc
    fireEvent.change(monthSelect, { target: { value: "4" } });
    expect(mockHandleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ name: "bMonth", value: "4" })
    }));
    
    // Zmień rok
    fireEvent.change(yearSelect, { target: { value: "2002" } });
    expect(mockHandleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ name: "bYear", value: "2002" })
    }));
  });
  
  test("powinien pokazać komunikat błędu, gdy istnieje dateError", () => {
    const errorMessage = "Musisz mieć co najmniej 14 lat";
    
    render(
      <DateOfBirthSelect 
        days={testDays} 
        months={testMonths} 
        years={testYears}
        bDay={1}
        bMonth={1}
        bYear={2000}
        handleRegisterChange={mockHandleChange}
        dateError={errorMessage}
      />
    );
    
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
