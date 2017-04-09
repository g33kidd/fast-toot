export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/auth',
    name: 'authentication-page',
    component: require('components/AuthPageView')
  },
  {
    path: '/instance/:instance',
    name: 'instance-page',
    component: require('components/InstancePageView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
