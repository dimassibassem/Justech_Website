import React, { useEffect, useRef, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/'
  }
]

export function Caroussel({ images }) {
  const myRef = useRef(0)
  const [index, setIndex] = useState(0)
  useEffect(() => {
    console.log(myRef.current.getCurrentIndex())
  }, [index])
  return (
      <ImageGallery ref={myRef} items={images} showFullscreenButton={false}
                     onSlide={() => {
        myRef.current.slideToIndex(myRef.current.getCurrentIndex() + 1)
        setIndex(myRef.current.getCurrentIndex())
      }} showPlayButton={false} />
  )
}


