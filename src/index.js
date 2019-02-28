import DefaultAvatar from './components/DafaultAvatar/DafaultAvatar.vue'

let components = [
  DefaultAvatar
]
const b = {}
b.install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default b
