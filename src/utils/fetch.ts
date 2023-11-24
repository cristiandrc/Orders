import { settings } from '@/utils/config'
import { fetching, getCurrentDate, getPrice } from './helpers'
export interface ListType {
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
  cedi: string
  startDate?: string
  endDate?: string
  filterCedi?: string
}

export const getOrders = async (data: getOrdersType) => {
  let totalSelling = { totalPrice: 0, totalOrders: 0 }
  const start =
    data.startDate === undefined || data.startDate === ''
      ? getCurrentDate()
      : data.startDate
  const end =
    data.endDate === undefined || data.endDate === ''
      ? getCurrentDate(true)
      : data.endDate
  const queryCedi =
    data.filterCedi === 'true' ? `&f_sellerNames=${data.cedi}` : ''

  const URL = `${data.API_URL}?per_page=100&f_creationDate=creationDate:[${start}T05:00:00.0000Z TO ${end}T05:00:00.0000Z]${queryCedi}&f_status=invoiced,payment-approved`
  const KEY = {
    key: data.apiKey,
    token: data.apiToken,
  }

  const rts = await fetching<responseType>(`${URL}`, KEY)
  if (rts.list) {
    totalSelling = getPrice(rts.list, data.brand)
  }

  for (let i = 2; i <= rts.paging.pages; i++) {
    const paginationData = await fetching<responseType>(`${URL}&page=${i}`, KEY)
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

export const getSales = async (
  startDate?: string,
  endDate?: string,
  filterCedi?: string
) => {
  const rts = await Promise.all(
    settings.brands.map(
      async (data) =>
        await getOrders({ ...data, startDate, endDate, filterCedi })
    )
  )

  return rts
}
