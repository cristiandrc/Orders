import Card from '@/components/Card'
import { getSales } from '@/utils/fetch'

interface SearchParams {
  dateStart?: string
  dateEnd?: string
}
interface Props {
  searchParams: SearchParams
}

export default async function Home({ searchParams }: Props) {
  const { dateStart, dateEnd } = searchParams
  const rts = await getSales(dateStart, dateEnd)
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
