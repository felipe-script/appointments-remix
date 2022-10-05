import { Link } from "@remix-run/react";
import React, { useReducer, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { TYPES } from "./enum";

import type { Appointment } from "~/types/features";
import { PATHS } from "~/enums/routes";
import { AppointmentItem, Loading } from "~/components";
import { indexReducer, INITIAL_STATE } from "./indexReducer";

type IndexComponentProps = {
  data?: Appointment[];
  url: string;
  token: string;
};

export const IndexComponent: React.FC<IndexComponentProps> = ({ data, url, token }) => {
  const originalAppointmentList = data;
  const [state, dispatch] = useReducer(indexReducer, {
    ...INITIAL_STATE,
    originalAppointmentList,
    appointmentSort: originalAppointmentList,
  });

  const TYPE_TITLE = "ASC_TITLE";
  const TYPE_START_DATE = "ASC_START_DATE";
  const TYPE_END_DATE = "ASC_END_DATE";

  useEffect(() => {
    if(!state.originalAppointmentList) return
    dispatch({
      type: TYPES.FETCH_START,
      payload: state.originalAppointmentList,
    });
  }, []);

  const deleteAppointment = async (id: number): Promise<void> => {
    if (!state.appointmentSort) return;

    const supabase = createClient(url, token);

    dispatch({ type: TYPES.FETCH_LOADING });

    try {
      const { error } = await supabase
        .from<Appointment>("appointments")
        .delete()
        .match({ id });

      if (error) return;

      const filteredList = state.appointmentSort.filter(
        (item) => item.id !== id
      );

      dispatch({ type: TYPES.FETCH_ORIGINAL_LIST, payload: filteredList });
      dispatch({ type: TYPES.FETCH_SORT_LIST, payload: filteredList });
    } catch (error) {
    } finally {
      dispatch({ type: TYPES.FETCH_LOADING });
    }
  };

  const renderListAppointments = ():
    | React.ReactElement[]
    | React.ReactElement => {
    if (state.loading) return <Loading isLoading={state.loading} />;
    if (state.appointmentSort && state.appointmentSort.length > 0)
      return state.appointmentSort.map((item) => (
        <AppointmentItem
          appointment={item}
          key={item.id}
          onClick={() => deleteAppointment(item.id)}
        />
      ));

    return <p className="text-center no-appointments">There are no appointments <span>&#128532;</span> </p>;
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>): void => {
    if (!originalAppointmentList) return;
    const targetText = e.currentTarget.value.toLowerCase();
    const filteredList = originalAppointmentList.filter((item) =>
      item.title.toLowerCase().includes(targetText)
    );

    dispatch({ type: TYPES.FETCH_SEARCH, payload: targetText });
    dispatch({ type: TYPES.FETCH_SORT_LIST, payload: filteredList });
  };

  const handleSortAppointment = (SORT_TYPE: string): void => {
    if (!state.originalAppointmentList) return;

    dispatch({ type: TYPES.FETCH_SEARCH, payload: `` });

    if (SORT_TYPE !== state.typeSort) {
      dispatch({ type: TYPES.FETCH_SORT_TYPE, payload: SORT_TYPE });
    } else {
      dispatch({ type: TYPES.FETCH_SORT_TYPE, payload: `` });
      dispatch({
        type: TYPES.FETCH_SORT_LIST,
        payload: state.originalAppointmentList,
      });
      return;
    }

    function compare(a: Appointment, b: Appointment) {
      if (SORT_TYPE === TYPE_START_DATE)
        return +new Date(b.startDay) - +new Date(a.startDay);

      if (SORT_TYPE === TYPE_END_DATE)
        return +new Date(b.endDay) - +new Date(a.endDay);

      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;

      return 0;
    }
    const dataCopy = [...state.originalAppointmentList];
    const sortFiltered = dataCopy.sort(compare);
    dispatch({ type: TYPES.FETCH_SORT_LIST, payload: sortFiltered });
  };

  const fingerUp = <>&#128070;</>;

  return (
    <div>
      <nav className="navigation">
        <Link to={PATHS.NEW_APPOINTMENT}>Create new Appointment</Link>
        <input
          placeholder="seach for an appointment"
          className="navigation__search"
          type="text"
          onChange={(e) => handleSearch(e)}
          value={state.search}
        />
      </nav>
      <h1 className="title-appointment">Appointments</h1>
      <ul className="filter-list">
        <li
          className="filter-list__item--title"
          onClick={() => handleSortAppointment(TYPE_TITLE)}
        >
          SORT TITLE {state.typeSort === TYPE_TITLE && <span>{fingerUp}</span>}
        </li>
        <li
          className="filter-list__item--start-date"
          onClick={() => handleSortAppointment(TYPE_START_DATE)}
        >
          SORT START DATE
          {state.typeSort === TYPE_START_DATE && <span>{fingerUp}</span>}
        </li>
        <li
          className="filter-list__item--end-date"
          onClick={() => handleSortAppointment(TYPE_END_DATE)}
        >
          SORT END DATE
          {state.typeSort === TYPE_END_DATE && <span>{fingerUp}</span>}
        </li>
      </ul>
      {renderListAppointments()}
    </div>
  );
};
