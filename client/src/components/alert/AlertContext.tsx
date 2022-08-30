import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { v4 } from 'uuid';
import Alert from './Alert';
import cs from 'classnames';

interface AlertContextI {
  state: StateI[];
  dispatch: React.Dispatch<ActionI>;
}

const AlertContext = createContext<AlertContextI | null>(null);

type PositionI =
  | 'top-right'
  | 'bottom-right'
  | 'top-left'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

interface AlertProviderProps {
  children?: ReactNode;
  position?: PositionI;
}

export interface StateI {
  id: string;
  type: 'ERROR' | 'SUCCESS'; // it can be expanded based on the need
  title?: string;
  message: string;
}

export enum ActionTypes {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
}

interface AddNotificationI {
  type: ActionTypes.ADD_NOTIFICATION;
  payload: StateI;
}

interface RemoveNotificationI {
  type: ActionTypes.REMOVE_NOTIFICATION;
  id: string;
}

export type ActionI = AddNotificationI | RemoveNotificationI;

const initialState: StateI[] = [];

const reducer = (state: StateI[], action: ActionI) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      return [...state, { ...action.payload }];

    case ActionTypes.REMOVE_NOTIFICATION:
      return state.filter((item) => item.id !== action.id);

    default:
      return state;
  }
};

const AlertProvider: React.FC<AlertProviderProps> = ({ children, position = 'top-right' }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const mappedAlerts = state.map((item) => {
    return <Alert dispatch={dispatch} key={item.id} {...item} />;
  });

  const value: AlertContextI = {
    state,
    dispatch
  };

  const wrapperClasses = cs('alert__wrapper fixed min-w-250 z-50', {
    'top-5 right-5': position === 'top-right'
  });

  return (
    <AlertContext.Provider value={value}>
      <div className={wrapperClasses}>{mappedAlerts}</div>
      {children}
    </AlertContext.Provider>
  );
};

export const useSuccessAlert = () => {
  const context = useContext(AlertContext);

  return ({ message, title }: { message: string; title?: string }) => {
    context?.dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      payload: {
        id: v4(),
        type: 'SUCCESS',
        message,
        title
      }
    });
  };
};

export const useErrorAlert = () => {
  const context = useContext(AlertContext);

  return ({ message, title }: { message: string; title?: string }) => {
    context?.dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      payload: {
        id: v4(),
        type: 'ERROR',
        message,
        title
      }
    });
  };
};

export default AlertProvider;
