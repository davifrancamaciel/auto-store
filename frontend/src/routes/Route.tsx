import React from 'react'
import {
  Route as ReactDOMRoute,
  Redirect,
  RouteProps as ReactDOMRouteProps
} from 'react-router-dom'

import AuthLayout from '../pages/_layouts/auth'
import DefaultLayout from '../pages/_layouts/default'

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const RouterWrapper: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const signed = true

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
