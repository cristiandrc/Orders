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
      <span className="card_brand">{brand}</span>
      {totalOrders ? (
        <>
          <div>
            <span className="card_title">Pedidos:</span> {totalOrders}
          </div>
          <div>
            <span className="card_title">Venta Total:</span>
            {totalSelling.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              maximumFractionDigits: 0,
            })}
          </div>
          <div>
            <span className="card_title">Avg. ticket:</span>
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
