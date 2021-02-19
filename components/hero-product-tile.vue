<template>
  <article class="product-option-wrap">
    <div class="product-image">
      <!-- <template v-if="isMobile && product.mobile_img">
        <img class="product-result-img" :src="getProductImage('mobile')" :alt="product.desktop_alt" />
      </template>
      <template v-else-if="!isMobile && product.desktop_img">
        <img class="product-result-img" :src="getProductImage('desktop')" :alt="product.desktop_alt" />
      </template> -->
      <template v-if="product.desktop_img || product.mobile_img">
        <!-- <picture>
          <source media="(max-width: 767px)" :srcset="getProductImage('mobile')" :alt="product.desktop_alt">
          <img class="product-result-img" :src="getProductImage('desktop')" :alt="product.desktop_alt">
        </picture> -->
        <source-set-img 
          :srcSet="srcSet"
          :defaultSet="defaultSrc"
          useClass="product-result-img" />
      </template>
      <template v-else>
        <img
          class="product-result-img default-img"
          src="<brand-logo>"
          alt="Default Product Preview"
        />
      </template>
    </div>
    <div class="product-result-content">
      <div class="price-content">
        <div class="price-content-heading">
          <h2 class="sub-heading-medium-red">{{ product.model }} {{ product.type }} {{ product.capacity ? '- ' + product.capacity : '' }}</h2>
        </div>
        <div class="price-wrap">
          <span
            class="big_price"
            :class="{ 'available-upon-request': isPriceAvailableUponRequest(product.srp) }"
            v-html="product.srp"
          >₱2.8m</span>
        </div>
      </div>
      <!-- <div class="model-wrap">
			<span class="model-series page-body__red" v-html="product.model">X3000 4x2 Tractor Head</span>
      </div>-->
      <div class="truck-details">
        <div class="result-container">
          <div class="result">
            <span class="result-heading">SPAN</span>
            <span class="page-body__small block">{{ product.max_power ? product.max_power : 'N/A' }}</span>
          </div>
          <div class="result">
            <span class="result-heading">SPAN</span>
            <span class="page-body__small block">{{ product.max_torque ? product.max_torque : 'N/A' }}</span>
          </div>
          <div class="result">
            <span class="result-heading">SPAN</span>
            <span class="page-body__small block">{{ product.capacity ? product.capacity : 'N/A' }}</span>
          </div>
          <div class="result result--image-brand">
            <img :src="product.brand.logo" :alt="product.brand.logo_alt" class="inline v-align-middle brand-logo">
          </div>
        </div>
      </div>
    </div>
    <a :href="productItemLink(product)" target="_self" class="more-detail-btn" @click.prevent="openProductDetailPage(productItemLink(product), product)">
      <span class="more-detail-btn-inner">SPAN</span>
    </a>
  </article>
</template>
<script lang="ts">
import { Vue, Component, Prop, mixins } from "nuxt-property-decorator";
import { Product } from "@/models/product";
import ProductUtil from "@/util/product-util";
import { SourceSet } from "@/models/gallery";
import SourceSetImg from "./sourceset.vue";

@Component({
  components: {
    SourceSetImg
  }
})
export default class HeroProductTile extends mixins(Vue, ProductUtil) {
  isMobile: boolean = this.$util.browserDetails().isMobile;
  @Prop({
    type: Object,
    required: true
  })
  product!: Product;

  srcSet: Array<SourceSet> = [
    { maxWidth: '767px', src: this.getProductImage('mobile'), alt: this.getProductAlt('desktop') }
  ];
  defaultSrc: SourceSet = {
    src: this.getProductImage('desktop'),
    alt: this.getProductAlt('desktop')
  }

  inlineStyle(imageUrl: string): any {
    return {
      backgroundImage: `url("${imageUrl}")`
    };
  }

  getProductImage(device: string) {
    let ftCarousel = (this.product as any).featured_carousels[0] ?? {};
    return ftCarousel[device == 'desktop' ? 'desktop_img' : 'mobile_img'] ?? this.product[device == 'desktop' ? 'desktop_img' : 'mobile_img']
  }

  getProductAlt(device: string) {
    let ftCarousel = (this.product as any).featured_carousels[0] ?? {};
    return ftCarousel[device == 'desktop' ? 'desktop_alt' : 'desktop_alt'] ?? this.product[device == 'desktop' ? 'desktop_alt' : 'desktop_alt']
  }
}
</script>
<style lang="scss" scoped>
.brand-logo {
  // height: 24px;
  height: 35px;
  vertical-align: middle;
}
article.product-option-wrap {
  overflow: hidden;
  height: 100%;
  display: block;
  // display: grid;
  // grid-template-rows: 63% 27% 10%;
}
.product-result-content {
  background-color: #ffffff;
}
.product-image {
  max-height: 249px;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.product-result-img {
  // object-fit: contain;
  object-fit: cover;
  min-height: 249px;
  height: 100%;
  width: 100%;

  &.default-img {
    width: 193px;
    height: 131px;
    object-fit: contain;
  }
}
.price-content {
  display: grid;
  grid-template-columns: 1fr auto;

  padding: 16px 12px;
  border: 1px solid #ffeded;

  .sub-heading-medium-red {
    font-size: 16px;
  }
  .big_price {
    // font-size: 24px;
    font-size: 22px;
    line-height: 22px;
  }
}
.truck-details {
  // display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 16px 12px;
  .result-container {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
.result-container {
  // display: grid;
  // // grid-template-columns: 20% 45% 35%;
  // grid-template-columns: 1fr 1fr;
  display: flex;
  flex-wrap: wrap;
  // align-items: center;
  margin-bottom: 12px;
  .result {
    flex: 0 0 50%;
    margin-bottom: 11px;
    &:nth-of-type(n + 3) {
      margin-bottom: 0;
    }
  }
}
.logo {
  display: block;
  vertical-align: bottom;
  margin-top: 20px;
}
.result {
  &.result--image-brand {
    display: flex;
    align-items: center;
  }
}
.more-detail-btn {
  display: block;
  font-family: "Coda", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: 1px;
  color: #000;
  background-color: #dbbfad;
  width: 100%;
  // height: 100%;
  height: auto;
  text-align: center;
  text-decoration: none;
  // padding: 15px 0;
  padding: 10px 0 9px;
  transition: all ease-in-out 0.4s;
  &:hover {
    background-color: #e3dbc1;
  }
  .icon {
    margin-right: 5px;
  }
  .more-detail-btn-inner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.sub-heading-medium-red {
  // font-size: 16px;
  font-size: 14px;
}
@media (min-width: 768px) {
  .more-detail-btn {
    padding: 15px 0;
  }
  .product-image {
    max-height: 328px;
  }
  .price-content {
    .sub-heading-medium-red {
      font-size: 20px;
    }
    .big_price {
      font-size: 32px;
    }
  }
  .result {
    &.result--image-brand {
      align-items: baseline;
      margin-top: 5px;
    }
  }
  .result-container {
    .result {
      flex: 0 0 22%;
      &:nth-of-type(n + 2) {
        margin-right: 10px;
      }
      &:last-of-type {
        margin-right: 0;
      }
      &.result--image-brand {
        flex-grow: 1;
        justify-content: flex-end;
      }
    }
  }
}
@media (min-width: 1024px) {
  .more-detail-btn {
    padding: 10px 0 9px;
  }
  .result-container {
    .result {
      flex: 0 0 30%;
      &:nth-of-type(n + 2) {
        margin-right: 0;
      }
      &:nth-of-type(2) {
        margin-right: 30px;
      }
      &.result--image-brand {
        flex: 100%;
        // text-align: center;
        justify-content: center;
        margin-top: 7px;
      }
    }
  }
  .sub-heading-medium-red {
    font-size: 20px;
  }
  .price-content {
    // padding: 17px 70px;
    // padding: 17px 50px;
    border: 1px solid #ffeded;
    grid-template-columns: 1fr auto;
    grid-column-gap: 20px; // added to create space in between the column
    .sub-heading-medium-red {
      font-size: 14px;
    }
    .big_price {
      font-size: 21px;
    }
  }

  .truck-details {
    grid-template-columns: 1fr auto;
    // padding: 0 70px;
    // padding: 0 50px;
    grid-column-gap: 5px; // added to create space in between the column
  }
}
@media (min-width: 1280px) {
  .result-container {
    .result {
      flex: 0 0 21%;
      margin-right: 10px;
      &:nth-of-type(n + 2) {
        margin-right: 10px;
      }
      &:last-of-type {
        margin-right: 0;
      }
      &.result--image-brand {
        margin-top: 0;
        flex: 0 0 23%;
        flex-grow: 1;
        justify-content: flex-end;
      }
    }
  }
  .price-content {
    .sub-heading-medium-red {
      font-size: 20px;
    }
    .big_price {
      font-size: 32px;
    }
  }
  .product-result-img {
    max-height: 328px;
    object-fit: cover;
  }
  .truck-details {
    padding: 10px 12px;
  }
}
@media (min-width: 1600px) {
  .price-content {
    padding: 17px 13px 18px 17px;
  }
  .more-detail-btn {
    padding: 15px 0;
  }
}
</style>