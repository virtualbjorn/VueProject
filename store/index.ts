import {  getAccessorType } from 'nuxt-typed-vuex'

import * as products from './products';
import * as forms from './forms';
import * as carousel from './carousel';
import * as brands from './brands';

export const accessorType = getAccessorType({
  modules: {
    products,
    forms,
    carousel,
    brands
  },
})
