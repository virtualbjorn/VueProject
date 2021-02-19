<template>
  <div class="featured-carousel-description__wrapper" v-if="(upperRightTexts && upperRightTexts.length) || lowerRightText">
    <div
      class="in-image__descriptions"
      v-if="upperRightTexts && upperRightTexts.length"
    >
      <template v-for="(description, dIdx) in upperRightTexts">
        <div :key="dIdx" class="in-image__item">
          <div class="in-image__bg"></div>
          <span class="in-image__item-text">{{ description }}</span>
        </div>
      </template>
    </div>
    <div class="bottom-slogan" v-if="lowerRightText">
      <div class="bottom-slogan__item">
        <span class="bottom-slogan__item-text">{{ lowerRightText }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, mixins } from "nuxt-property-decorator";

declare const _: any;

@Component
export default class FeaturedCarouselDescriptions extends Vue {
  @Prop({
    type: Array,
    default: []
  }) upperRightTexts!: Array<string>;

  @Prop({
    type: String,
    default: ''
  }) lowerRightText!: string;
}
</script>
<style lang="scss" scoped>
.in-image {
  &__descriptions {
    position: absolute;
    max-width: 97%; // added max-width to control the description of product image
    top: 17px;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  &__bg {
    background-color: #8f0101;
    transform: matrix(1, 0, -0.27, 1, 0, 0);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // height: 32px;
  }
  &__item {
    padding: 6px 20px;
    text-align: center;
    position: relative;
    // clip-path: polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%);

    &:nth-child(1) {
      margin-right: 9px;
    }
    &:nth-child(2) {
      margin-right: 18px;
    }
    &:nth-child(3) {
      margin-right: 27px;
    }
    &-text {
      font-family: "Coda", "Helvetica Neue", Helvetica, Arial, sans-serif;
      position: relative;
      font-size: 16px;
      color: #ffffff;
      // white-space: nowrap;
    }
  }
}

.bottom-slogan {
  position: absolute;
  bottom: 12px;
  right: 50%;
  transform: translateX(50%);
  max-width: 90%;
  &__item {
    display: flex;
    justify-content: center;
    background-color: #2f2323;
    clip-path: polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%);
    // padding: 6px 20px;
    padding: 5px 20px;
    text-align: center;
    &-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      // font-size: 16px;
      font-size: 20px;
      line-height: 43px;
      color: #ffffff;
    }
  }
}

@media (min-width: 480px) {
  .bottom-slogan {
    &__item {
    }
    &__item-text {
      font-size: 20px;
      font-family: "Coda", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
  }
}

@media (min-width: 768px) {
  .bottom-slogan {
    // width: 488.96px;
    width: auto;
    max-width: 60%;
    bottom: 21px;
    right: 22px;
    transform: initial;
    &__item {
      display: -webkit-box;
      // font-size: 27px;
      padding: 5px 36px;
    }
    &__item-text {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      white-space: pre-wrap;
      // font-size: 27px;
    }
  }
  .in-image {
    &__descriptions {
      max-width: 100%; // added max-width to control the description of product image
    }
  }
}
@media (min-width: 1600px) {
  .bottom-slogan {
    &__item {
      // padding: 11px 20px;
    }
    &__item-text {
      font-size: 27px;
    }
  }
}
</style>