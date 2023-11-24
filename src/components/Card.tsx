interface Props {
  totalOrders: number
  totalSelling: number
  avg: number
  brand: string
}
export default async function Card({
  totalOrders,
  totalSelling,
  avg,
  brand,
}: Props) {
  return (
    <article>
      <span>{brand}</span>
      {totalOrders ? (
        <>
          <div>
            Orders: {totalOrders} {' | '} Gross Total:{' '}
            {totalSelling.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              maximumFractionDigits: 0,
            })}
          </div>
          <div>
            Avg. ticket:
            {avg.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              maximumFractionDigits: 0,
            })}
          </div>
        </>
      ) : (
        <>No hay Pedidos</>
      )}
    </article>
  )
}
