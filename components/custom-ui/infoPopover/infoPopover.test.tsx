import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoPopover from ".";
import PasswordInfo from "../../register/passwordInfo";

describe("InfoPopover Component", () => {
  test("renders without crashing", () => {
    render(
      <InfoPopover label="Password information">
        <PasswordInfo />
      </InfoPopover>
    );

    // Check if the component renders the heading and description
    expect(screen.getByText("Password information")).toBeInTheDocument();
  });

  test("shows tooltip correctly", () => {
    render(
      <InfoPopover label="Password information">
        <PasswordInfo />
      </InfoPopover>
    );

    fireEvent.click(screen.getByRole("button", { name: "Password information" }));

    // Check if the component renders tooltip
    expect(screen.getByTestId('info-popover-content')).toBeInTheDocument();
  });
});
