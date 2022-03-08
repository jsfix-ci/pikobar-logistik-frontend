import { asyncRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route, isVaccineModule) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      if (route.path === '/') {
        return true
      }
      return route.meta.roles.includes(role) &&
      /**
       * can't state 'route.meta.isVaccineModule === isVaccineModul',
       * because route.meta.isVaccineModule could be undefined
       */
        (
          (route.meta.isVaccineModule && isVaccineModule) ||
          (!route.meta.isVaccineModule && !isVaccineModule)
        )
    })
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles, isVaccineModule) {
  const res = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp, isVaccineModule)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles, isVaccineModule)
      }
      res.push(tmp)
    }
  })
  return res
}

export default {
  generateRoutes({ commit }, { roles, isVaccineModule }) {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes || []
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles, isVaccineModule)
    }
    commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes
  }
}
