import Dispense from '@dispense/dispense-js'

const dispense = Dispense(process.env.NEXT_PUBLIC_DISPENSE_API_KEY!, {
  _testApiUrl: process.env.NEXT_PUBLIC_DISPENSE_BASE_URL,
})

export default dispense
