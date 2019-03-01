import Button from 'components/Button/Button'
import Page from 'components/Page/Page'

let components = [
  Page,
  Button
]
const b = {}
b.install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default b
