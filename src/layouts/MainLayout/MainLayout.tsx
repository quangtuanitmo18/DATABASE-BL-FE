import Footer from './Footer'
import Header from './Header'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col items-center px-10'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
