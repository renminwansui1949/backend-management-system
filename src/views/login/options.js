import image1 from '@/assets/login/安全.svg'
import image2 from '@/assets/login/办公1.svg'
import image3 from '@/assets/login/办公2.svg'
import image4 from '@/assets/login/办公3.svg'
import image5 from '@/assets/login/办公4.svg'
import image6 from '@/assets/login/厂房1.svg'

import image7 from '@/assets/login/流程1.svg'
import image8 from '@/assets/login/流程2.svg'

import image9 from '@/assets/login/智能1.svg'
import image10 from '@/assets/login/智能2.svg'
import image11 from '@/assets/login/智能3.svg'
import image12 from '@/assets/login/智能4.svg'

export const IMAGES_MAP = [
  {
    label: '安全1',
    image: image1,
    value: 'image1',
  },
  {
    label: '办公1',
    image: image2,
    value: 'image2',
  },
  {
    label: '办公2',
    image: image3,
    value: 'image3',
  },
  {
    label: '办公3',
    image: image4,
    value: 'image4',
  },
  {
    label: '办公4',
    image: image5,
    value: 'image5',
  },
  {
    label: '厂房1',
    image: image6,
    value: 'image6',
  },
  {
    label: '流程1',
    image: image7,
    value: 'image7',
  },
  {
    label: '流程2',
    image: image8,
    value: 'image8',
  },
  {
    label: '智能1',
    image: image9,
    value: 'image9',
  },
  {
    label: '智能2',
    image: image10,
    value: 'image10',
  },
  {
    label: '智能3',
    image: image11,
    value: 'image11',
  },
  {
    label: '智能4',
    image: image12,
    value: 'image12',
  },
]

export const getCurrentAppLoginImage = (value) => {
  console.log('value', value)
  return IMAGES_MAP.find((item) => item.value === value)?.image
}
