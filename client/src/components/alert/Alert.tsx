import { useCallback, useEffect, useState } from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { BiErrorCircle } from 'react-icons/bi';
import { ActionI, ActionTypes, StateI } from './AlertContext';
import cs from 'classnames';

interface Props extends StateI {
  dispatch: React.Dispatch<ActionI>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Alert: React.FC<Props> = ({ message, type, dispatch, id, title }) => {
  const [width, setWidth] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // handleStartTimer();

    const id = setTimeout(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 1;
        }

        clearInterval(id);
        return prev;
      });
    }, 50);

    setIntervalId(id);

    return () => {
      clearTimeout(id);
    };
  }, [width]);

  const handleStartTimer = () => {
    // const id = setInterval(() => {
    //   setWidth((prev) => {
    //     if (prev < 100) {
    //       return prev + 1;
    //     }

    //     clearInterval(id);
    //     return prev;
    //   });
    // }, 50);

    const id = setTimeout(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 1;
        }

        clearInterval(id);
        return prev;
      });
    }, 50);

    setIntervalId(id);
  };

  const handleStopTimer = () => {
    clearInterval(intervalId as NodeJS.Timer);
  };

  const handleCloseTimer = useCallback(() => {
    clearInterval(intervalId as NodeJS.Timer);
    setExit(true);
    setTimeout(() => {
      dispatch({
        type: ActionTypes.REMOVE_NOTIFICATION,
        id
      });
    }, 500);
  }, [dispatch, id, intervalId]);

  useEffect(() => {
    if (width === 100) {
      handleCloseTimer();
      setTimeout(() => {
        dispatch({
          type: ActionTypes.REMOVE_NOTIFICATION,
          id
        });
      }, 500);
    }
  }, [width, handleCloseTimer, dispatch, id]);

  const classes = cs(
    'alert rounded relative overflow-hidden mb-5 w-250 duration-200 shadow cursor-pointer',
    {
      'bg-green-800': type === 'SUCCESS',
      'bg-red-800': type === 'ERROR',
      'animate-alert-slide-out-right': exit,
      'animate-alert-slide-in-right': !exit
    }
  );

  const barClasses = cs('h-2', {
    'bg-green-600': type === 'SUCCESS',
    'bg-red-600': type === 'ERROR'
  });

  return (
    <div onMouseEnter={handleStopTimer} onMouseLeave={handleStartTimer} className={classes}>
      {/* className={`alert ${type === 'SUCCESS' ? 'success' : 'error'} ${exit ? 'exit' : ''}`}> */}
      <div
        className="alert__icon text-white absolute -top-1 h-fit right-3 cursor-pointer"
        onClick={handleCloseTimer}>
        x
      </div>
      {/* {title && <Text.H4 className="alert__header px-2 py-2">{title}</Text.H4>} */}
      <div className="flex items-center py-3 px-1">
        <span>
          {type === 'SUCCESS' && <RiCheckLine className="text-xl text-white" />}
          {type === 'ERROR' && <BiErrorCircle className="text-xl text-white" />}
        </span>
        <p className="alert__message px-2 break-all text-white">{message}</p>
      </div>
      <div
        className={barClasses}
        style={{
          width: `${width}%`
        }}></div>
    </div>
  );
};

export default Alert;
