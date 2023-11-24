import { settings } from '@/utils/config'

interface ListType {
  orderId: number
  clientName: string
  totalValue: number
  status: string
}
interface responseType {
  list: ListType[]
  paging: {
    total: number
    pages: number
  }
  totalSelling: number
}

interface getOrdersType {
  API_URL: string
  brand: string
  apiKey: string | undefined
  apiToken: string | undefined
  startDate?: string
  endDate?: string
}

const fetching = async <T>(
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

const getPrice = (list: ListType[], d: string) => {
  console.log(list, d)
  const filterRts = list.filter(({ status }) => status === 'payment-approved')

  const rts = filterRts.reduce(
    (a, c) => {
      const value = parseInt(`${c.totalValue}`.slice(0, -2))
      const totalPrice = (a.totalPrice += value)
      return { totalPrice, totalOrders: a.totalOrders + 1 }
    },
    { totalPrice: 0, totalOrders: 0 }
  )
  return rts
}

export const getOrders = async (data: getOrdersType) => {
  let totalSelling = { totalPrice: 0, totalOrders: 0 }
  const start = data.startDate ?? '2023-11-24'
  const end = data.endDate ?? '2023-11-25'
  const URL = `${data.API_URL}?per_page=100&f_creationDate=creationDate:[${start}T05:00:00.0000Z TO ${end}T05:00:00.0000Z]`

  const rts = await fetching<responseType>(`${URL}`, {
    key: data.apiKey,
    token: data.apiToken,
  })
  if (rts.list) {
    totalSelling = getPrice(rts.list, data.brand)
  }

  for (let i = 2; i <= rts.paging.pages; i++) {
    const paginationData = await fetching<responseType>(`${URL}&page=${i}`, {
      key: data.apiKey,
      token: data.apiToken,
    })
    if (!paginationData.list) {
      totalSelling = {
        totalPrice: totalSelling.totalPrice,
        totalOrders: totalSelling.totalOrders,
      }
    } else {
      const paginationPrice = getPrice(paginationData.list, data.brand)
      totalSelling = {
        totalPrice: totalSelling.totalPrice + paginationPrice.totalPrice,
        totalOrders: totalSelling.totalOrders + paginationPrice.totalOrders,
      }
    }
  }

  return {
    brand: data.brand,
    totalOrders: totalSelling.totalOrders,
    totalSelling: totalSelling.totalPrice,
    avg: totalSelling.totalPrice / totalSelling.totalOrders,
  }
}

export const getSales = async (startDate?: string, endDate?: string) => {
  const rts = await Promise.all(
    settings.brands.map(
      async (data) => await getOrders({ ...data, startDate, endDate })
    )
  )

  return rts
}
