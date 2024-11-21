import { lazy, Suspense, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { AppContext } from './contexts/app.context'
import Login from './pages/Auth'
import path from './utils/path'
import Client from './pages/Client/Client'
import Home from './pages/Home/Home'

const NotFound = lazy(() => import('./pages/NotFound'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  console.log(isAuthenticated)

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      children: [
        {
          path: path.home,
          element: (
            <MainLayout>
              <Suspense>
                <Home />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            // <RegisterLayout>
            <Suspense>
              <Login />
            </Suspense>
            // </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.client,
          element: (
            <MainLayout>
              <Suspense>
                <Client />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElements
}
