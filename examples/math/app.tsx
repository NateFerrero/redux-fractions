import * as React from 'react' // tslint:disable-line:no-implicit-dependencies
import { component } from '../../src'

const buttonStyle = (selected: boolean) => ({
  backgroundColor: '#ccc',
  borderRadius: '3px',
  margin: '2px',
  ...(selected
    ? {
        backgroundColor: 'blue',
        color: 'white'
      }
    : {})
})

const doMath = (x: number, y: number, operand: string) => {
  switch (operand) {
    case '+':
      return x + y
    case '-':
      return x - y
    case '×':
      return x * y
    case '÷':
      return x / y
    default:
      return 'Err'
  }
}

export const App = component('App')
  .state<{
    _: {
      operand: string
    }
    x: number
    y: number
  }>({
    _: {
      operand: '+'
    },
    x: 0,
    y: 0
  })
  .actions<{
    setOperand: string
    setX: number
    setY: number
  }>({
    setOperand: operand => ({ _: { operand } }),
    setX: x => ({ x: isNaN(x) ? 0 : x }),
    setY: y => ({ y: isNaN(y) ? 0 : y })
  })
  .render(({ x, y, _: { operand } }, actions) => (
    <div>
      <input
        type="number"
        onChange={event => actions.setX(event.target.valueAsNumber)}
        value={x}
      />
      <button
        style={buttonStyle(operand === '+')}
        disabled={operand === '+'}
        onClick={() => actions.setOperand('+')}
      >
        +
      </button>
      <button
        style={buttonStyle(operand === '-')}
        disabled={operand === '-'}
        onClick={() => actions.setOperand('-')}
      >
        -
      </button>
      <button
        style={buttonStyle(operand === '×')}
        disabled={operand === '×'}
        onClick={() => actions.setOperand('×')}
      >
        ×
      </button>
      <button
        style={buttonStyle(operand === '÷')}
        disabled={operand === '÷'}
        onClick={() => actions.setOperand('÷')}
      >
        ÷
      </button>
      <input
        type="number"
        onChange={event => actions.setY(event.target.valueAsNumber)}
        value={y}
      />{' '}
      = {doMath(x, y, operand)}
    </div>
  ))
