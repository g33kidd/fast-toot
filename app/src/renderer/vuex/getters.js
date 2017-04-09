import _ from 'lodash'

// export const mainCounter = state => state.counters.main
export const instances = state => state.instances.instances

export const instanceForRoute = state => {
  if(state.route.params.instance === null) {
    return {}
  }
  
  return _.find(state.instances.instances, (o) => {
    return o.instance === state.route.params.instance
  })
}
