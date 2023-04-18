import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer component", () => {
  test("should render Footer component", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const footerComponent = screen.getByTestId("footer");
    expect(footerComponent).toBeInTheDocument();
  });

  test("should render links with correct text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link");
    const linkText = links.map((link) => link.textContent);
    expect(linkText).toEqual([
      "English(UK)",
      "Français(FR)",
      "العربية",
      "ⵜⴰⵎⴰⵣⵉⵖⵜ",
      "Español (España)",
      "italiano",
      "Deutsch",
      "Português (Brasil)",
      "हिन्दी",
      "中文(简体)",
      "日本語",
      "",
      "Sign Up",
      "Log in",
      "Messenger",
      "Facebook Lite",
      "Watch",
      "Places",
      "Games",
      "Marketplace",
      "Facebook Pay",
      "Oculus",
      "Portal",
      "Instagram",
      "Bulletin",
      "Local",
      "Fundraisers",
      "Services",
      "Voting Information Centre",
      "Groups",
      "About",
      "Create ad",
      "Create Page",
      "Developers",
      "Careers",
      "Privacy",
      "Cookies",
      "AdChoices ",
      "Terms",
      "Help",
    ]);
  });

  test("should render Meta © 2023 text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const metaText = screen.getByText("Meta © 2023");
    expect(metaText).toBeInTheDocument();
  });
});
