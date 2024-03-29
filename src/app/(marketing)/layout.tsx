import React from 'react'
import { Navbar } from './_components/navbar'
import { Footer } from './_components/footer'

const layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <html>
      <body>
        <Navbar />
        <div className='h-full bg-slate-100'>
          <main className='pt-40 pb-20 bg-slate-100'>
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}

export default layout