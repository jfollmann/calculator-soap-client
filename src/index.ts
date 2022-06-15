import CalculatorService from './calculator'

const makeCalculatorService = (): CalculatorService => new CalculatorService()

const sum = async (x: number, y: number) => {
  try {
    const calculator = makeCalculatorService()
    const { status, statusText, result } = await calculator.sum({ x, y })

    console.log(`[${status} - ${statusText}] ${x} + ${y} = ${result}`)
  } catch (error) {
    console.error({ error })
  }
}

const substract = async (x: number, y: number) => {
  try {
    const calculator = makeCalculatorService()
    const { status, statusText, result } = await calculator.subtract({ x, y })

    console.log(`[${status} - ${statusText}] ${x} - ${y} = ${result}`)
  } catch (error) {
    console.error({ error })
  }
}

const main = async () => {
  await sum(1, 3)
  await substract(10, 5)
}

main()
