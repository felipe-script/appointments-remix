import { Form } from "@remix-run/react";
import React from "react";

export const NewAppointmentForm = (): React.ReactElement => {
  return (
    <Form className="form" method="post">
      <div className="form__input-control">
        <label htmlFor="title" className="form__input-control__label">
          Title
        </label>
        <input
          required
          name="title"
          type="text"
          placeholder="Title"
          className="form__input-control__input"
        />
      </div>
      <div className="form__input-control">
        <label htmlFor="startDay" className="form__input-control__label">
          Start Date
        </label>
        <input
          required
          name="startDay"
          type="date"
          placeholder="Date"
          className="form__input-control__input"
          min="2022-01-02"
        />
      </div>
      <div className="form__input-control">
        <label htmlFor="startTime" className="form__input-control__label">
          Start Time
        </label>
        <input
          required
          name="startTime"
          type="time"
          placeholder="Time"
          className="form__input-control__input"
        />
      </div>
      <div className="form__input-control">
        <label htmlFor="endDay" className="form__input-control__label">
          End Date
        </label>
        <input
          required
          name="endDay"
          type="date"
          placeholder="Date"
          className="form__input-control__input"
          min="2022-01-02"
        />
      </div>
      <div className="form__input-control">
        <label htmlFor="endTime" className="form__input-control__label">
          End Time
        </label>
        <input
          required
          name="endTime"
          type="time"
          placeholder="Time"
          className="form__input-control__input"
        />
      </div>
      <button type="submit" className="form__create-btn">
        CREATE
      </button>
    </Form>
  );
};
