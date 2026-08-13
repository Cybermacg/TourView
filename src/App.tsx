import './App.css'
import { Attractions } from './sections/Attractions'
import { HeroSection } from './sections/HeroSection'
import { ImageGallerySection } from './sections/ImageGallerySection'
import { InsightSection } from './sections/InsightSection'
import { TestimonialSection } from './sections/TestimonialSection'
import { useSearchStore } from './store/SearchValueStore'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const hasSearched = useSearchStore((state) => state.hasSearched);

  return (
    <>
      <HeroSection />
      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <InsightSection />
            <ImageGallerySection />
            <Attractions />
            <TestimonialSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
