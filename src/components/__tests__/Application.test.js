import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
  getByDisplayValue,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

describe("Application", () => {
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(container, "Saving"));
    const day = getAllByTestId(container, "day").find((d) =>
      queryByText(d, "Monday")
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    //RENDER THE APPLICATION COMPONENT
    const { container } = render(<Application />);
    //WAIT UNTIL THE APPLICATION COMPONENT RENDER AND DISPLAY A CONTENT
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //GET ALL APPOINTMENT COMPONENTS
    const appointments = getAllByTestId(container, "appointment");
    //TARGET AN APPOINTMENT COMPONENT TO TEST A FUNCTION
    const appointment = appointments[1];
    //MOCK DELETE BUTTON CLICK
    fireEvent.click(getByAltText(appointment, "Delete"));
    //ASSERT AN APPOINTMENT COMPONENT DISPLAY THE CONFIRM COMPONENT
    expect(
      getByText(appointment, /Are you sure you would like to delete?/i)
    ).toBeInTheDocument();
    //MOCK CONFIRM BUTTON CLICK
    fireEvent.click(getByText(appointment, "Confirm"));
    //ASSERT AN APPOINTMENT COMPONENT DISPLAY DELETE STATUS
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    //WAIT UNTIL THE DELETING STATUS DISMOUNTED
    await waitForElementToBeRemoved(() => getByText(container, "Deleting"));
    //GET A DAYLISTITEM COMPONENTS WITH SELECTED CONDITION (MONDAY)
    const day = getAllByTestId(container, "day").find((d) =>
      queryByText(d, "Monday")
    );
    //ASSERT REMAINING SPOTS MATCH
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(container, "Saving"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find((d) =>
      queryByText(d, "Monday")
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    await waitForElementToBeRemoved(() => getByText(container, "Saving"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(appointment, /are you sure you would like to delete?/i)
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    await waitForElementToBeRemoved(() => getByText(container, "Deleting"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});
