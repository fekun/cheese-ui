import Button from 'components/Button/Button'
import Page from 'components/Page/Page'
import Carousel from 'components/Carousel/Carousel'

let components = [
  Page,
  Button,
  Carousel
]
const b = {}
b.install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default b
