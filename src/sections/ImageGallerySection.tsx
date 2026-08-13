import { useSearchStore } from "../store/SearchValueStore";
import { usePexelSearch } from "../hooks/usePexelsClient";
 import DomeGallery from '../assets/components/reactbits/DomeGallery';
export const ImageGallerySection = () => {
    const searchTerm = useSearchStore((state) => state.searchTerm);
    const { data: pexelsData } = usePexelSearch(searchTerm);
    const photos = pexelsData?.photos ?? [];
    const galleryImages = photos.map((photo) => ({
        src: photo.src.portrait,
        alt: photo.alt,
    }))
    return(
        <section className="bg-black w-full min-h-screen">
            <div className="w-full h-screen">
                <DomeGallery
                    images={galleryImages}
                    fit={5}
                    minRadius={600}
                    maxVerticalRotationDeg={0}
                    segments={50}
                    dragDampening={2}
                    grayscale={false}
                    overlayBlurColor="#000000"
                />
            </div>
        </section>
   )

}