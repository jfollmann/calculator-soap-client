/* eslint-disable no-redeclare */
export namespace Calculator {
  export type Input = {
    x: number,
    y: number,
  }

  export type Output = {
    status: number,
    statusText: string,
    result: number,
  }
}

export interface Calculator {
  sum(input: Calculator.Input): Promise<Calculator.Output>
  subtract(input: Calculator.Input): Promise<Calculator.Output>
}
