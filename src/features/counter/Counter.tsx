import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../store';

import { decrement, increment } from './counterSlice';

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          type="button"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>

        <button
          type="button"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <div>count is: {count}</div>
      </div>
    </div>
  );
}
