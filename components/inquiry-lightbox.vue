<template>
  <lightbox :lightboxState="inquiryLightboxState" :wrapperClass="'lightbox-inquiry'" @close="$emit('closeInquiryLightbox')">
    <div class="container popup__inner bg-inquiry" style="left: 0px;">
      <div
        class="container-inner popup__content focus-outline"
        role="document"
        tabindex="0"
        v-if="!showInquiryThankYou"
      >
        <div class="icon-wrap">
          <button type="button" class="icon ico-close-white" @click.stop="$emit('closeInquiryLightbox')"></button>
        </div>
        <div class="heading-container">
          <h1 v-if="!productInquiry" class="heading__white align-center separator">Inquiry</h1>
          <h1 v-else class="heading__white align-center separator">Product Inquiry</h1>
          <span class="page-body__white align-center" v-if="false">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Porttitor
            condimentum sed ut nibh quam et porttitor. Pellentesque gravida ipsum augue tellus id. Enim vitae at
            dictum
            elit.
          </span>
        </div>
        <article class="product-thumbnail-wrap" v-if="productInquiry">
          <span class="product-thumbnail__heading">You are inquiring for</span>
          <div class="product-thumbnail">
            <figure class="product-thumbnail__image-wrap align-center">
              <!-- <img v-if="isMobile && product.mobile_img" class="product-thumbnail__image" :src="product.mobile_img" :alt="product.desktop_alt">
              <img v-else-if="!isMobile && product.desktop_img" class="product-thumbnail__image" :src="product.desktop_img" :alt="product.desktop_alt"> -->
              <source-set-img
                v-if="defaultSrc.src"
                :srcSet="srcSet"
                :defaultSet="defaultSrc"
                useClass="source-set-img" />
              <img v-else class="default-img" src="<brand-logo>" alt="Default Product Preview">
            </figure>
            <div class="product-thumbnail__info">
              <div class="product-thumbnail__info-item">
                <span class="product-thumbnail__info-title">Model</span>
                <span class="product-thumbnail__info-value">{{ product.brand.name }} {{ product.model }} {{ product.type }}</span>
              </div>
              <div class="product-thumbnail__info-item" v-if="product.type">
                <span class="product-thumbnail__info-title">Type</span>
                <span class="product-thumbnail__info-value">{{ product.type }}</span>
              </div>
              <div class="product-thumbnail__info-item" v-if="product.srp">
                <span class="product-thumbnail__info-title">Price</span>
                <span class="product-thumbnail__info-value big-price">{{ product.srp }}</span>
              </div>
              <div class="product-thumbnail__info-item">
                <figure class="product-thumbnail__info-img-wrap">
                  <img class="product-thumbnail__info-img" :src="product.brand.logo" :alt="product.brand.logo_alt">
                </figure>
              </div>
            </div>
          </div>
        </article>
        <form class="form" method="POST" @submit.prevent="onSubmitInquiry">
          <fieldset class="fieldset">
            <div class="form-group separator" v-if="!productInquiry">
              <div class="one-whole form-input-cont Product-model">
                <input
                  tabindex="0"
                  class="Product-model"
                  type="text"
                  name="Product name or model"
                  placeholder="Product name or model"
                  v-model="inquiryData.inquiry_subject"
                />
                <span class="error hidden">Error</span>
              </div>
            </div>
            <div class="form-group-wrapper separator personal-details">
              <span class="page-body__light-brown separator">Personal Details</span>
              <div class="form-group">
                <div class="one-sixth form-input-cont form-gap">
                  <input
                    tabindex="0"
                    class="FullName"
                    type="text"
                    name="FullName"
                    placeholder="Full Name"
                    v-model="inquiryData.name"
                  />
                  <span class="error hidden">Error</span>
                </div>
              </div>
              <div class="form-group">
                <div class="one-third form-input-cont mobile-number-cont form-gap">
                  <input
                    tabindex="0"
                    class="mobile-number"
                    type="text"
                    name="Mobile Number"
                    placeholder="Mobile Number"
                    v-model="inquiryData.mobile_number"
                  />
                  <span class="error hidden">Error</span>
                </div>
                <div class="one-third form-input-cont location-cont form-gap">
                  <input
                    tabindex="0"
                    class="email-address"
                    type="text"
                    name="EmailAddress"
                    placeholder="Email Address"
                    v-model="inquiryData.email"
                  />
                  <span class="error hidden">Error</span>
                </div>
                <div class="one-third form-input-cont location-cont">
                  <input
                    tabindex="0"
                    class="birthday"
                    type="text"
                    name="Birthday"
                    placeholder="Birthday"
                    v-model="inquiryData.birthdate"
                  />
                  <span class="error hidden">Error</span>
                </div>
                <!-- <div class="one-third form-input-cont location-cont">
                  <input
                    tabindex="0"
                    class="location"
                    type="text"
                    name="location"
                    placeholder="Location"
                  />
                  <span class="error hidden">Error</span>
                </div> -->
              </div>
            </div>

            <div class="form-group-wrapper company-details">
              <span class="page-body__light-brown separator">Company</span>

              <div class="form-group">
                <div class="one-half form-input-cont company-name-cont form-gap">
                  <input
                    tabindex="0"
                    class="company-name"
                    type="text"
                    name="CompanyName"
                    placeholder="Company Name (Optional)"
                    v-model="inquiryData.company"
                  />
                  <span class="error hidden">Error</span>
                </div>
                <div class="one-half form-input-cont Designation-cont">
                  <input
                    tabindex="0"
                    class="Designation"
                    type="text"
                    name="Designation"
                    placeholder="Designation (Optional)"
                    v-model="inquiryData.designation"
                  />
                  <span class="error hidden">Error</span>
                </div>
              </div>
              <div class="form-group">
                <div class="one-whole form-input-cont">
                  <textarea
                    tabindex="0"
                    type="text"
                    class="textarea-message"
                    placeholder="Inquiry Message"
                    v-model="inquiryData.message"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="recaptcha-cont separator">
              <recaptcha-v2 :reCaptchaId="'reCaptchaId'" class="recaptcha" @captchaLoaded="onCaptchaLoaded"></recaptcha-v2>
            </div>

            <div class="btn-container align-center">
              <button :disabled="disableSubmit" type="submit" class="primary-button__brown send-message-btn uppercase">send inquiry</button>
            </div>
          </fieldset>
        </form>
      </div>
      <inquiry-thank-you v-if="showInquiryThankYou" @dismissInquiryThankYou="dismissInquiryThankYou"></inquiry-thank-you>
    </div>
  </lightbox>
</template>

<script lang="ts">
import { Vue, Component, Prop, mixins, Watch } from "nuxt-property-decorator";
import { Product } from "@/models/product";
import ProductUtil from "@/util/product-util";
import { Inquiry } from '@/models/forms';
import InquiryThankYou from '@/components/inquiry-thank-you.vue';
import { SourceSet } from "@/models/gallery";
import SourceSetImg from "./sourceset.vue";

declare const _: any;

@Component({
  components: {
    InquiryThankYou,
    SourceSetImg
  }
})
export default class InquiryLightbox extends mixins(Vue, ProductUtil) {
  isMobile: boolean = this.$util.browserDetails().isMobile;

  @Prop({
    type: Boolean,
    default: false
  }) inquiryLightboxState!: boolean;

  @Prop({
    type: Object,
    default: () => {}
  }) product!: Product;

  srcSet: Array<SourceSet> = [];
  defaultSrc: any = {}

  @Watch('product')
  onProductDataChanged(product) {
    if (product) {
      this.srcSet = [
      { maxWidth: '767px', src: this.product.mobile_img, alt: this.product.desktop_alt }
      ];
      this.defaultSrc = {
        src: this.product.desktop_img,
        alt: this.product.desktop_alt
      } as SourceSet;
    }
  }

  showInquiryThankYou: boolean = false;

  dismissInquiryThankYou() {
    this.showInquiryThankYou = false;
    this.$emit('closeInquiryLightbox');
  }

  inquiryData: Inquiry = new Inquiry();
  recaptchaToken: string = "";

  get productInquiry(): boolean {
    return !_.isEmpty(this.product);
  }

  get disableSubmit() : boolean {
    return !this.recaptchaToken;
  }

  mounted() {
    this.$root.$on('resetInquiryLightbox', () => {
      this.dismissInquiryThankYou();
    });
  }

  onCaptchaLoaded(token: string) {
    this.recaptchaToken = token;
  }

  onSubmitInquiry() {
    if (!this.recaptchaToken) return;
    if (this.productInquiry) {
      let { brand, model, type  } = this.product;
      this.inquiryData.inquiry_subject = `Inquiry on ${brand.name} ${model} ${type}`;
    }
    let validated = _.chain(this.inquiryData)
          .values()
          .filter((data: any) => !!data)
          .value()
          .length;
    if (!validated) return;

    this.inquiryData.referral_link = this.$route.fullPath;
    this.$accessor.forms.inquiry({
      data: this.inquiryData
    }).then((response) => {
      this.inquiryData = new Inquiry();
      this.recaptchaToken = "";
      this.showInquiryThankYou = true;
      // this.$emit('closeInquiryLightbox');
    }).catch(err => {
      // console.log(err);
    })
  }
}
</script>

<style lang="scss" scoped>
.product-thumbnail {
  // display: flex;
  // flex-direction: row;
  padding: 0px;
  background: #FFFFFF;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  // max-width: 492px;
  overflow: hidden;
  &-wrap {
    margin-bottom: 18px;
  }
  &__heading {
    display: block;
    color: white;
    text-align: center;
    line-height: 28px;
    margin-bottom: 2px;
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__info {
    // padding: 19px 8px;
    .product-thumbnail__info-item {
      margin-bottom: 14px;
      &:last-of-type {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        margin-bottom: 0;
      }
    }
  }
  &__info-img {
    width: 100%;
    max-width: 75px;
  }
  &__info-title {
    display: block;
    font-size: 12px;
    font-weight: normal;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.5);
  }
  &__info-value {
    font-size: 14px;
    font-weight: 700;
    color: #8F0101;
    &.big-price {
      font-size: 20px;
    }
  }
  &__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: rgba(143, 1, 1, 0.5);
  }
  &__link-text {
    font-size: 12px;
    margin-left: 5px;
  }
}
.container {
  padding: 0;
}
.lightbox-inquiry {
  .ico-close-white {
    width: 18px;
    top: 0;
    right: 8px;
  }
  .icon-wrap {
    position: sticky;
    text-align: right;
    top: 25px;
    right: 8px;
  }
}
.inquiry-thank-you__wrapper {
  padding: 50px 0 50px;
}
@media (min-width: 768px) {
  .company-details {
    .form-group {
      display: flex;
    }
  }
  .container {
    &.popup__inner {
      max-width: 97vw;
    }
  }
  .lightbox-inquiry {
    .ico-close-white {
      top: 0;
      right: -63px;
    }
  }
  .personal-details {
    .one-sixth {
      width: 100%;
    }
  }
  .product-thumbnail {
      &__image {
      display: block;
    }
  }
  // .inquiry-thank-you__wrapper {
  //   padding: 0 0 50px;
  // }
}
@media (min-width: 1024px) {
  .container {
    &.popup__inner {
      max-width: 935px;
    }
  }
  .company-details {
    .one-half {
      width: 50%;
    }
  }
  .personal-details {
    .form-group {
      &:nth-of-type(1) {
        grid-template-columns: 1fr;
      }
    }
  }
    .product-thumbnail  {
       &__image {
           max-width: 450px;
       }
    }
}
</style>