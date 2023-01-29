import { Dimensions, Image, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const widthBaseScale = SCREEN_WIDTH / 375
const heightBaseScale = SCREEN_HEIGHT / 667

const normalize = (size: number, based: 'width' | 'height' = 'width') => {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

// for width  pixel
const widthPixel = (size: number) => normalize(size, 'width')

// for height  pixel
const heightPixel = (size: number) => normalize(size, 'height')

// for font  pixel
const fontPixel = (size: number) => widthPixel(size)

// for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number) => heightPixel(size)

// for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number) => widthPixel(size)

async function calculateImageSize(imageUrl: string): Promise<{ width: number; height: number }> {
  let imageHeight = 0
  let imageWidth = 0

  await Image.getSize(imageUrl, (width, height) => {
    const screenWidth = Dimensions.get('window').width
    const scaleFactor = width / screenWidth
    imageHeight = height / scaleFactor / 2
    imageWidth = width / scaleFactor / 2
  })
  return {
    width: imageWidth,
    height: imageHeight,
  }
}

function hashToRGBA(i: number) {
  // eslint-disable-next-line no-bitwise
  const colour = (i & 0x00ffffff).toString(16).toUpperCase()
  return '#' + '00000'.substring(0, 6 - colour.length) + colour
}

function hashCode(s: string): number {
  // eslint-disable-next-line no-bitwise
  return s.split('').reduce((hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0)
}

export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  calculateImageSize,
  hashToRGBA,
  hashCode,
}
