import { useState, useEffect } from 'react'
import { Product } from 'src/types'

export default function useProducts(storeId: string) {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState<{
    data: Product[]
  }>({
    data: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching')
      const response = await fetch(
        'http://localhost:3030/2023-03/products?' +
          new URLSearchParams({
            storeId,
          }),
        {
          headers: {
            'x-dispense-api-key': '4e098e6b-8e87-459f-bae4-84101618caff',
          },
        }
      )
      const data = await response.json()
      setData(data)
      setStatus('fetched')
    }

    fetchData()
  }, [])

  return data
}
