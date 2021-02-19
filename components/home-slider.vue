<template>
  <div class="hero-slider__wrapper">
    <div class="hero-slider__item-list-wrapper">
      <template v-for="(sliderItem, sIdx) in carouselItems">
        <div
          :key="sIdx"
          v-if="showItem(sliderItem)"
          class="hero-slider__item-container"
          :data-top="nextItems[0] == sIdx || prevItems[prevItems.length - 1] == sIdx"
          :class="[sliderItem.type === 'photo' ? 'event-item' : 'product-item']"
        >
          <template v-if="sliderItem.type === 'photo'">
            <div :style="backgroundImage(sliderItem.mobile_img)" class="event-image" v-if="isMobile">
              <img v-show="false" :src="sliderItem.mobile_img" :alt="sliderItem.desktop_alt">
            </div>
            <div :style="backgroundImage(sliderItem.desktop_img)" class="event-image" v-else>
              <img v-show="false" :src="sliderItem.desktop_img" :alt="sliderItem.desktop_alt">
            </div>
          </template>
          <template v-if="sliderItem.type === 'product'">
            <hero-product-tile :product="sliderItem.product" :key="sIdx"></hero-product-tile>
          </template>
        </div>
      </template>
    </div>
    <div class="hero-slider__controls-container">
      <button class="hero-slider__controls-btn prev-btn" @click.stop="prevItem">
        <span class="v-btn__content">
          <i aria-hidden="true" class="v-icon chevron-left"></i>
        </span>
      </button>
      <button class="hero-slider__controls-btn next-btn" @click.stop="nextItem">
        <span class="v-btn__content">
          <i aria-hidden="true" class="v-icon chevron-right"></i>
        </span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import { Product } from "@/models/product";
import HeroProductTile from "@/components/hero-product-tile.vue";
import { CarouselItem } from "@/models/featured-carousel-slider";

@Component({
  components: {
    HeroProductTile
  }
})
export default class HomeSlider extends Vue {
  isMobile: boolean = this.$util.browserDetails().isMobile;
  sliderItemCollection: Array<Element> = [];
  activeSlide: number = 0;
  lastIndex: number = 0;
  carouselItemClass: string = "hero-slider__item-container";

  nextItems: number[] = [];
  prevItems: number[] = [];

  @Prop({
    type: Array,
    required: false
  })
  carouselItems!: any;

  @Watch("carouselItems")
  onCarouselItemsDataChanged() {
    this.$nextTick(() => {
      this.sliderItemCollection = Array.from(
        this.$el.querySelectorAll("." + this.carouselItemClass)
      );
      // this.activeSlide = Math.round(this.sliderItemCollection.length / 2) - 1;
      this.activeSlide = 0;
      this.setInitialClasses();
    });
  }

  showItem(sliderItem: any) {
    if (sliderItem.type === 'photo') {
      if(!this.isMobile) {
        return sliderItem.desktop_img !== '' ? true : false;
      } else {
        return sliderItem.mobile_img !== '' ? true : false;
      }
    } else {
      return sliderItem.product.homecarousel_featured && !sliderItem.product.draft;
    }
  }

  setInitialClasses() {
    if (this.sliderItemCollection && this.sliderItemCollection.length) {
      this.sliderItemCollection[this.activeSlide].classList.add("active");
      this.lastIndex = this.sliderItemCollection.length - 1;
      this.sliderItemCollection[this.lastIndex].classList.add("prev");
      if (this.sliderItemCollection.length == 3) {
        this.sliderItemCollection[this.lastIndex - 1].classList.add("next");
      } else if (this.sliderItemCollection.length > 3) {
        this.sliderItemCollection[this.activeSlide + 1].classList.add("next");
        let midSliderItemCollection = this.sliderItemCollection.slice(
          2,
          this.lastIndex
        );
        let firstMidSliderItemCollection = midSliderItemCollection.slice(
          0,
          Math.floor(midSliderItemCollection.length / 2)
        );
        let secondMidSliderItemCollection = midSliderItemCollection.slice(
          Math.floor(midSliderItemCollection.length / 2)
        );
        firstMidSliderItemCollection.forEach((sliderItemEl, sIdx) => {
          sliderItemEl.classList.add("next-items");
        });
        secondMidSliderItemCollection.forEach((sliderItemEl, sIdx) => {
          sliderItemEl.classList.add("prev-items");
        });
        this.sliderItemCollection.forEach((sliderItemEl, sIdx) => {
          if (sliderItemEl.classList.contains("next-items"))
            this.nextItems.push(sIdx);
          if (sliderItemEl.classList.contains("prev-items"))
            this.prevItems.push(sIdx);
        });
      }
    } else {
      // console.log('unable to load home carousel!')
    }
  }

  nextItem() {
    let oldPrevSlide =
      this.activeSlide - 1 < 0 ? this.lastIndex : this.activeSlide - 1;
    this.sliderItemCollection[this.activeSlide].classList.remove("active");
    this.sliderItemCollection[this.activeSlide].classList.add("prev");
    this.activeSlide++;
    if (this.sliderItemCollection.length == 3) {
      if (this.activeSlide == this.lastIndex) {
        this.setNewActiveSlide();
        this.sliderItemCollection[0].classList.remove("prev");
        this.sliderItemCollection[0].classList.add("next");
      } else if (this.activeSlide > this.lastIndex) {
        this.activeSlide = 0;
        this.setNewActiveSlide();
        this.sliderItemCollection[this.lastIndex - 1].classList.remove("prev");
        this.sliderItemCollection[this.lastIndex - 1].classList.add("next");
      } else {
        this.setNewActiveSlide();
        this.sliderItemCollection[this.lastIndex].classList.remove("prev");
        this.sliderItemCollection[this.lastIndex].classList.add("next");
      }
    } else if (this.sliderItemCollection.length > 3) {
      let firstNextItemsIndex = this.nextItems.shift() || 0;
      let firstPrevItemsIndex = this.prevItems.shift() || 0;
      this.nextItems.push(firstPrevItemsIndex);
      this.prevItems.push(oldPrevSlide);
      this.sliderItemCollection[oldPrevSlide].classList.replace(
        "prev",
        "prev-items"
      );
      this.sliderItemCollection[firstNextItemsIndex].classList.replace(
        "next-items",
        "next"
      );
      this.sliderItemCollection[firstPrevItemsIndex].classList.replace(
        "prev-items",
        "next-items"
      );
      if (this.activeSlide > this.lastIndex) {
        this.activeSlide = 0;
        this.setNewActiveSlide();
      } else {
        this.setNewActiveSlide();
      }
    }
  }

  prevItem() {
    let oldNextSlide =
      this.activeSlide + 1 > this.lastIndex ? 0 : this.activeSlide + 1;
    this.sliderItemCollection[this.activeSlide].classList.remove("active");
    this.sliderItemCollection[this.activeSlide].classList.add("next");
    this.activeSlide--;
    if (this.sliderItemCollection.length == 3) {
      if (this.activeSlide == 0) {
        this.setNewActiveSlide();
        this.sliderItemCollection[this.lastIndex].classList.remove("next");
        this.sliderItemCollection[this.lastIndex].classList.add("prev");
      } else if (this.activeSlide < 0) {
        this.activeSlide = this.lastIndex;
        this.setNewActiveSlide();
        this.sliderItemCollection[this.lastIndex - 1].classList.remove("next");
        this.sliderItemCollection[this.lastIndex - 1].classList.add("prev");
      } else {
        this.setNewActiveSlide();
        this.sliderItemCollection[0].classList.remove("next");
        this.sliderItemCollection[0].classList.add("prev");
      }
    } else if (this.sliderItemCollection.length > 3) {
      let lastNextItemsIndex = this.nextItems.pop() || 0;
      let lastPrevItemsIndex = this.prevItems.pop() || 0;
      this.nextItems = [oldNextSlide].concat(this.nextItems);
      this.prevItems = [lastNextItemsIndex].concat(this.prevItems);
      this.sliderItemCollection[oldNextSlide].classList.replace(
        "next",
        "next-items"
      );
      this.sliderItemCollection[lastNextItemsIndex].classList.replace(
        "next-items",
        "prev-items"
      );
      this.sliderItemCollection[lastPrevItemsIndex].classList.replace(
        "prev-items",
        "prev"
      );
      if (this.activeSlide < 0) {
        this.activeSlide = this.lastIndex;
        this.setNewActiveSlide();
      } else {
        this.setNewActiveSlide();
      }
    }
  }

  setNewActiveSlide() {
    this.sliderItemCollection[this.activeSlide].classList.remove(
      "next",
      "prev"
    );
    this.sliderItemCollection[this.activeSlide].classList.add("active");
  }

  backgroundImage(imageUrl: string) {
    return `background-image: url("${imageUrl}")`;
  }
}
</script>
<style lang="scss" scoped>
$slider-item-container-width: 100vw * 425 / 480;
$slider-item-container-height: 494px;
// $slider-item-container-height: 100vh * 514 / 800;

.v-icon {
  margin: 0 auto;
  // width: 15px;
  // height: 15px;
  width: 10px;
  height: 13px;
}
.image-event {
	display: none;
	visibility: hidden;
}

.event-image {
  width: 100%;
  height: 100%;
  // object-fit: contain;
  background-size: contain;
  background-position: center;
}
.chevron-left {
  background: url("~assets/images/svg/chevron-left--white.svg") no-repeat center
    center transparent;
}
.chevron-right {
  background: url("~assets/images/svg/chevron-right--white.svg") no-repeat
    center center transparent;
}
.hero-slider {
  &__wrapper {
    height: $slider-item-container-height;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 70px;
  }
  &__item-list-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__item-container {
    // width: $slider-item-container-width;
    // height: $slider-item-container-height;
    width: 100%;
    max-width: 287px;
    height: auto;
    // min-height: $slider-item-container-height;
    min-height: 457px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 1;
    transition: transform 400ms ease-in-out, filter 500ms ease-in-out;

    border-radius: 8px;
    background-color: #ffffff;
    &.event-item {
      height: 100%;
    }

    &.active {
      box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.45);
      transform: translate(-50%, -50%);
      z-index: 4;
    }
    &.prev,
    &.next {
      z-index: 3;
    }
    &.prev-items,
    &.next-items {
      &[data-top="true"] {
        z-index: 2;
      }
    }
    &.prev-items,
    &.next-items {
      z-index: 1;
    }
    &.prev,
    &.prev-items {
      transform: translate(-60%, -50%) scale(0.9);
      filter: blur(2px);
    }
    &.next,
    &.next-items {
      transform: translate(-40%, -50%) scale(0.9);
      filter: blur(2px);
    }
  }
  &__controls-container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 287px;
    // width: $slider-item-container-width;
    height: $slider-item-container-height;
    z-index: 5;
    pointer-events: none;
  }
  &__controls-btn {
    width: 40px;
    height: 40px;
    background-color: rgb(0, 0, 0, 0.4);
    border-radius: 20px;
    position: absolute;
    top: 50%;
    pointer-events: all;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    &.next-btn {
      right: 0;
      // transform: translate(29%, -50%);
      transform: translate(-20%, -250%);
    }
    &.prev-btn {
      left: 0;
      // transform: translate(-35%, -50%);
      // transform: translate(-29%, -50%);
      transform: translate(20%, -250%);
      .chevron-left {
        left: -1px;
      }
    }
  }
}

@media (min-width: 768px) {
  $slider-item-container-width: 100vw * 1024 / 1600;
  $slider-item-container-height: 494px;
  .hero-slider {
    &__wrapper {
      height: $slider-item-container-height;
      // margin-top: 0;
    }
    &__item-list-wrapper {
      margin-top: 36px;
    }
    &__item-container {
      // width: $slider-item-container-width;
      // height: $slider-item-container-height;
      max-width: 574px;
      &.active {
      }
      &.prev,
      &.prev-items {
        // transform: translate(-70%, -50%) scale(0.9);
        transform: translate(-67%, -50%) scale(0.9);
      }
      &.next,
      &.next-items {
        // transform: translate(-30%, -50%) scale(0.9);
        transform: translate(-33%, -50%) scale(0.9);
      }
      &.event-item {
        min-height: 546px;
      }
    }
    &__controls-container {
      // width: $slider-item-container-width;
      height: $slider-item-container-height;
      max-width: 574px;
    }
    &__controls-btn {
      background-color: white;
      .chevron-left {
        background: url("~assets/images/svg/chevron-left.svg") no-repeat center
          center transparent;
      }
      .chevron-right {
        background: url("~assets/images/svg/chevron-right.svg") no-repeat center
          center transparent;
      }
      &.next-btn {
        transform: translate(48%, -50%);
      }
      &.prev-btn {
        transform: translate(-48%, -50%);
      }
    }
  }
}

@media (min-width: 1024px) {
  $slider-item-container-width: 100vw * 600 / 1600;
  $slider-item-container-height: 494px;
  // $slider-item-container-height: 100vh * 514 / 900;
  .hero-slider {
    &__wrapper {
      height: $slider-item-container-height;
      margin-top: 0;
    }
    &__item-list-wrapper {
      // margin-top: 70px;
      margin-top: 0;
    }
    &__item-container {
      // width: $slider-item-container-width;
      // width: 466px;
      // height: $slider-item-container-height;
      max-width: 382px;
      &.active {
      }
      &.prev,
      &.next {
      }
      &.next-items {
      }
      &.prev-items,
      &.next-items {
      }
      &.prev,
      &.prev-items {
        transform: translate(-75%, -50%) scale(0.9);
      }
      &.next,
      &.next-items {
        transform: translate(-25%, -50%) scale(0.9);
      }
      &.event-item {
        min-height: 588px;
      }
    }
    &__controls-container {
      // width: $slider-item-container-width;
      // width: 466px;
      max-width: 382px;
      height: $slider-item-container-height;
    }
    &__controls-btn {
      &.next-btn {
        // transform: translate(50%, -50%);
        transform: translate(-20%, -330%);
      }
      &.prev-btn {
        // transform: translate(-50%, -50%);
        transform: translate(20%, -330%);
      }
    }
  }
}

@media (min-width: 1280px) {
  $slider-item-container-width: 100vw * 600 / 1600;
  $slider-item-container-height: 494px;
  // $slider-item-container-height: 100vh * 514 / 900;
  .hero-slider {
    &__wrapper {
      height: $slider-item-container-height;
    }
    &__item-list-wrapper {
      margin-top: 0;
    }
    &__item-container {
      // width: $slider-item-container-width;
      // height: $slider-item-container-height;
      // width: 640px;
      max-width: 573px;
      &.active {
      }
      &.prev,
      &.next {
      }
      &.next-items {
      }
      &.prev-items,
      &.next-items {
      }
      &.prev,
      &.prev-items {
        transform: translate(-70%, -50%) scale(0.9);
      }
      &.next,
      &.next-items {
        transform: translate(-30%, -50%) scale(0.9);
      }
      &.event-item {
        min-height: 514px;
      }
    }
    &__controls-container {
      // width: $slider-item-container-width;
      height: $slider-item-container-height;
      // width: 640px;
      max-width: 573px;
    }
    &__controls-btn {
      &.next-btn {
        transform: translate(48%, -50%);
      }
      &.prev-btn {
        transform: translate(-48%, -50%);
      }
    }
  }
}
@media (min-width: 1366px) {
  .hero-slider {
    &__item-container {
      // width: 575px;
      &.event-item {
        // min-height: 537px;
      }
    }
    &__controls-container {
      // width: 576px;
    }
  }
}
@media (min-width: 1600px) {
  .hero-slider__item-container,
  .hero-slider__controls-container {
    max-width: 736px;
  }
  .hero-slider__item-container {
    max-height: 514px;
    &.event-item {
      max-height: 514px;
    }
    &.prev,
    &.prev-items {
      transform: translate(-67%, -50%) scale(0.9);
    }
    &.next,
    &.next-items {
      transform: translate(-33%, -50%) scale(0.9);
    }
  }
}
@media (min-width: 1700px) {
  .hero-slider {
    &__item-container {
      max-width: 736px;
    }
    &__controls-container {
      max-width: 736px;
    }
  }
}
</style>