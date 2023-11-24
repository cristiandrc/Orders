import { ListType } from './fetch'

export const fetching = async <T>(
  url: string,
  auth: { key?: string; token?: string }
): Promise<T> => {
  try {
    const rts = await fetch(url, {
      cache: 'no-store',
      headers: {
        'X-VTEX-API-AppKey': auth.key ?? '',
        'X-VTEX-API-AppToken': auth.token ?? '',
      },
    })

    const data = await rts.json()

    if (data?.error?.message === 'Acesso não autorizado') {
      throw new Error()
    }
    return data
  } catch (error) {
    console.error(error)
    throw new Error(`fetching error ${url}`)
  }
}

export const getPrice = (list: ListType[], d: string) => {
  const rts = list.reduce(
    (a, c) => {
      console.log(c.creationDate)
      const value = parseInt(`${c.totalValue}`.slice(0, -2))
      const totalPrice = (a.totalPrice += value)
      return { totalPrice, totalOrders: a.totalOrders + 1 }
    },
    { totalPrice: 0, totalOrders: 0 }
  )
  return rts
}

export const getCurrentDate = (end: boolean) => {
  if (end) {
    return '2023-11-24'
  }
  const currentDate = new Date()
  currentDate.setHours(currentDate.getHours() - 5)

  const year = currentDate.getFullYear()

  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')

  const day = currentDate.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}
