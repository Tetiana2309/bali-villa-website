import { DesktopCanvas } from './components/DesktopCanvas'
import { Hero } from './sections/Hero'
import { OurMethod } from './sections/OurMethod'
import { HowWeWork } from './sections/HowWeWork'
import { Gallery } from './sections/Gallery'
import { Testimonials } from './sections/Testimonials'
import { FAQ } from './sections/FAQ'
import { Contacts } from './sections/Contacts'

function App() {
  return (
    <DesktopCanvas>
      <Hero />
      <OurMethod />
      <HowWeWork />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contacts />
    </DesktopCanvas>
  )
}

export default App
