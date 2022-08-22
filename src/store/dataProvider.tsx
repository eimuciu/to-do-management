import React, { useContext, createContext, useReducer, useEffect } from 'react';
import { updateData } from '../api/db';
import { useAuthCtx } from './authProvider';
import { getData } from '../api/db';

const DataContext = createContext({});

interface Props {
  children: JSX.Element;
}

const initialData: any = [];

export function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_TODOS':
      return [...action.payload].reverse();
    case 'CHANGE_STATUS':
      const todoIndex = state.indexOf(action.payload.data);
      const newdata = state
        .map((tobj: any, idx: any) =>
          idx === todoIndex
            ? {
                ...tobj,
                status:
                  tobj.status === 'incomplete' ? 'completed' : 'incomplete',
              }
            : tobj,
        )
        .reverse();
      updateData(action.payload.uid, newdata, (resdata: any) => {});
      return newdata.reverse();
    default:
      return state;
  }
}

function DataProvider({ children }: Props) {
  const [data, dispatch] = useReducer(reducer, initialData);
  const { isUserLoggedIn, user } = useAuthCtx();

  useEffect(() => {
    if (isUserLoggedIn && user) {
      const downdata = async () => {
        const dataresp = await getData(user.uid);
        dispatch({ type: 'SET_TODOS', payload: dataresp?.data });
      };
      downdata();
    }
  }, [isUserLoggedIn, user]);

  const ctx = { data, dispatch };

  return <DataContext.Provider value={ctx}>{children}</DataContext.Provider>;
}

export function useDataCtx(): any {
  return useContext(DataContext);
}

export default DataProvider;
