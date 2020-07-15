export default function ({ store, route, redirect }) {
  const { user } = store.state

  if (!user && route.path !== '/') {
    redirect('/')
  }

  if (user && route.path === '/') {
    redirect('/dashboard')
  }
}
