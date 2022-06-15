import { Calculator } from './contracts'

import { Axios } from 'axios'
import { ParserOptions, parseStringPromise } from 'xml2js'

// https://documenter.getpostman.com/view/8854915/Szf26WHn
export default class CalculatorService implements Calculator {
  private readonly api: Axios
  private readonly xmlParserOptions: ParserOptions

  constructor () {
    this.api = new Axios({
      baseURL: 'http://www.dneonline.com/calculator.asmx',
      headers: { 'Content-Type': 'text/xml;charset=UTF-8' }
    })

    this.xmlParserOptions = { trim: true, explicitArray: false }
  }

  async sum ({ x, y }: Calculator.Input): Promise<Calculator.Output> {
    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Add xmlns="http://tempuri.org/">
          <intA>${x}</intA>
          <intB>${y}</intB>
        </Add>
      </soap:Body>
    </soap:Envelope>`

    const { status, statusText, data: xmlResponse } = await this.api.post('', data, { headers: { SoapAction: 'http://tempuri.org/Add' } })
    const {
      'soap:Envelope': {
        'soap:Body': {
          AddResponse: {
            AddResult: result
          }
        }
      }
    } = await parseStringPromise(xmlResponse, this.xmlParserOptions)

    return { status, statusText, result: +result }
  }

  async subtract ({ x, y }: Calculator.Input): Promise<Calculator.Output> {
    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Subtract xmlns="http://tempuri.org/">
          <intA>${x}</intA>
          <intB>${y}</intB>
        </Subtract>
      </soap:Body>
    </soap:Envelope>`

    const { status, statusText, data: xmlResponse } = await this.api.post('', data, { headers: { SoapAction: 'http://tempuri.org/Subtract' } })
    const {
      'soap:Envelope': {
        'soap:Body': {
          SubtractResponse: {
            SubtractResult: result
          }
        }
      }
    } = await parseStringPromise(xmlResponse, this.xmlParserOptions)

    return { status, statusText, result: +result }
  }
}
