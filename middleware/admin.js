export default function ({ store, error, route }) {
  const meta = route.meta.find((el) => el.can)
  if (!store.getters.role) {
    return error({ statusCode: 403, message: 'Forbidden' })
  }

  if (meta && store.getters.role.name !== 'Super Admin') {
    if (!store.getters.permissions.find((el) => el === meta.can)) {
      return error({ statusCode: 403, message: 'Forbidden' })
    }
  }
}
