import DateHandle from '@/components/DateHandle'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>GCO</h1>
          <DateHandle />
        </header>
        {children}
      </body>
    </html>
  )
}
