import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'
import path from 'src/utils/path'

const Header = () => {
  const { profile, isAuthenticated, reset } = useContext(AppContext)
  const roles = profile?.roles

  const navigate = useNavigate()

  const menu = [
    {
      name: 'Client',
      to: path.client,
      permission: roles?.includes('admin') || roles?.includes('client')
    },
    {
      name: 'Drink',
      to: path.drink,
      permission: roles?.includes('admin') || roles?.includes('drink')
    },
    {
      name: 'Food',
      to: path.food,
      permission: roles?.includes('admin') || roles?.includes('food')
    },
    {
      name: 'Employee',
      to: path.employee,
      permission: roles?.includes('admin') || roles?.includes('employee')
    },
    {
      name: 'Order',
      to: path.order,
      permission: roles?.includes('admin') || roles?.includes('order')
    },
    {
      name: 'Position',
      to: path.position,
      permission: roles?.includes('admin') || roles?.includes('position')
    }
  ]
  return (
    <div className='container'>
      <header className='w-full'>
        <div className='flex  w-full flex-col items-center justify-center gap-7 p-8'>
          <nav className='flex w-full items-center justify-center border-gray-200 bg-white  dark:bg-gray-900'>
            <div className='mx-auto flex  w-full flex-wrap items-center justify-between p-4'>
              <NavLink to={path.home} className='flex items-center space-x-3 rtl:space-x-reverse'>
                <img src='https://flowbite.com/docs/images/logo.svg' className='h-8' alt='Flowbite Logo' />
                <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
                  TranBaoLinh
                </span>
              </NavLink>
              <div className='flex items-center space-x-6 rtl:space-x-reverse'>
                <a href='tel:5541251234' className='text-sm  text-gray-500 hover:underline dark:text-white'>
                  (555) 412-1234
                </a>
                {isAuthenticated ? (
                  <>
                    <span className='text-sm  text-gray-500 dark:text-white'>{profile?.username}</span>
                    <button
                      onClick={() => {
                        clearLS()
                        navigate(path.login)
                      }}
                      className='text-sm  text-blue-600 hover:underline dark:text-blue-500'
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink to={path.login} className='text-sm  text-blue-600 hover:underline dark:text-blue-500'>
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </nav>
          <nav className='bg-gray-50 dark:bg-gray-700'>
            <div className='mx-auto w-full px-4 py-3'>
              <div className='flex items-center'>
                {isAuthenticated && (
                  <ul className='mt-0 flex flex-row gap-9 space-x-8 text-sm font-medium rtl:space-x-reverse'>
                    {menu.map((item) => {
                      return (
                        item.permission && (
                          <li key={item.name}>
                            <NavLink
                              to={item.to}
                              className='text-gray-900 hover:underline dark:text-white'
                              aria-current='page'
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        )
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header
