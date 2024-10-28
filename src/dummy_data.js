import mathImg from './assets/images/math.png'
import englishImg from './assets/images/languages.png'
import musicImg from './assets/images/guitar.png'

export const products = [
  {
    id: '123',
    subject: 'math',
    location: 'london',
    price: '100.00',
    spaces: 5,
    imageUrl: mathImg,
  },
  {
    id: '124',
    subject: 'math',
    location: 'york',
    price: '100.00',
    spaces: 5,
    imageUrl: mathImg,
  },
  {
    id: '125',
    subject: 'math',
    location: 'dubai',
    price: '100.00',
    spaces: 5,
    imageUrl: mathImg,
  },
  {
    id: '126',
    subject: 'english',
    location: 'london',
    price: '90.00',
    spaces: 5,
    imageUrl: englishImg,
  },
  {
    id: '127',
    subject: 'english',
    location: 'york',
    price: '90.00',
    spaces: 5,
    imageUrl: englishImg,
  },
  {
    id: '128',
    subject: 'english',
    location: 'dubai',
    price: '100.00',
    spaces: 5,
    imageUrl: englishImg,
  },
  {
    id: '129',
    subject: 'music',
    location: 'london',
    price: '80.00',
    spaces: 5,
    imageUrl: musicImg,
  },
  {
    id: '130',
    subject: 'music',
    location: 'york',
    price: '90.00',
    spaces: 5,
    imageUrl: musicImg,
  },
  {
    id: '131',
    subject: 'music',
    location: 'dubai',
    price: '80.00',
    spaces: 5,
    imageUrl: musicImg,
  },
]

export const cartItems = [products[0], products[1], products[4]]
