import React from 'react'
import {
  Route as ReactDOMRoute,
  Redirect,
  RouteProps as ReactDOMRouteProps
} from 'react-router-dom'

import AuthLayout from '../pages/_layouts/auth'
import DefaultLayout from '../pages/_layouts/default'
import { store } from '../store'

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const RouterWrapper: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const storeState: any = store.getState()
  const {signed }= storeState.auth
  console.log(signed)

  if (!signed && isPrivate) {
    return <Redirect to='/' />
  }

  if (signed && !isPrivate) {
    return <Redirect to='/dashboard' />
  }

  const Layout: React.FC = signed ? DefaultLayout : AuthLayout

  return (
    <ReactDOMRoute
      {...rest}
      render={props => (
        <Layout>
          <Component {...rest} />
        </Layout>
      )}
    />
  )
  //   return (
  //     <ReactDOMRoute
  //       {...rest}
  //       render={({ location }) => {
  //         return isPrivate === !!signed ? (
  //           <Component />
  //         ) : (
  //           <Redirect
  //             to={{
  //               pathname: isPrivate ? '/' : '/dashboard',
  //               state: { from: location }
  //             }}
  //           />
  //         )
  //       }}
  //     />
  //   )
}

export default RouterWrapper
