import Card from '@/components/Card'
import { getSales } from '@/utils/fetch'

interface SearchParams {
  dateStart?: string
  dateEnd?: string
  filterCedi?: string
}
interface Props {
  searchParams: SearchParams
}

export default async function Home({ searchParams }: Props) {
  const { dateStart, dateEnd, filterCedi } = searchParams
  const rts = await getSales(dateStart, dateEnd, filterCedi)
  return (
    <main>
      <section>
        {rts.map((data, i) => (
          <Card {...data} key={i} />
        ))}
      </section>
    </main>
  )
}
