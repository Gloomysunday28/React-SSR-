export default async function getStaticRouter(routers) {
  const staticRouters = []
  
  for (let i = 0; i < routers.length; i++) {
    const route = routers[i]
    staticRouters.push(
      {
        ...route,
        component: (await route.component().props.load()).default
      }
    )
  }
  
  return staticRouters
}