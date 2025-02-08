interface SmartRouter{ 
  [k:string]:{
    component:any
    show?:boolean
    auth?:number[]
  } 
}

export default function smartRouterConverter(smartRoutes:SmartRouter) {
  let routes :{[k:string]:any} ={}
  Object.keys(smartRoutes).forEach(key=>{
    routes[key] =smartRoutes[key].component
  })

  return {smartRoutes, routes}
}