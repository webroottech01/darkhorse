import Dispense from '@dispense/dispense-js'

const dispense = Dispense(process.env.NEXT_PUBLIC_DISPENSE_API_KEY!, {
  _env: {
    apiUrl: process.env.NEXT_PUBLIC_DISPENSE_BASE_URL!,
    iframeOrigin: '',
    menusUrl: '',
  },
})

export default dispense
