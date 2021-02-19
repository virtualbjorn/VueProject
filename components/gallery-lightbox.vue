<template>
  <lightbox :lightboxState="galleryLightboxState" :wrapperClass="'lightbox-gallery'" @close="$emit('closeGalleryLightbox')">
    <div class="popup__inner" style="top: 0; left: 0px;" tabindex="-1">
      <div class="popup__content focus-outline" role="document" tabindex="0">
        <div class="icon-wrap">
          <button type="button" class="icon ico-close" @click.stop="$emit('closeGalleryLightbox')"></button>
        </div>
        <h1 class="hidden"></h1>
        <h2 class="sub-heading lightbox-sub-heading">{{ gallery[currentGalleryIndex].name }}</h2>
        <div class="viewed-img">
          <img class="img_viewed" :src="gallery[currentGalleryIndex].src" :alt="gallery[currentGalleryIndex].name">
        </div>
        <div class="thumb-nail">
          <template v-for="(galleryItem, gIdx) in gallery">
            <button v-if="!(gIdx == currentGalleryIndex)" :key="gIdx" @click.stop="$emit('updateCurrentGalleryIndex', gIdx)" class="thumb-nail__item"><img class="img_viewed" :src="galleryItem.src" :alt="galleryItem.name"></button>
          </template>
        </div>
      </div>
    </div>
  </lightbox>
</template>

<script lang="ts">
import { Vue, Component, Prop, mixins } from "nuxt-property-decorator";
import { GalleryModel } from '@/models/gallery';

declare const _: any;

@Component
export default class GalleryLightbox extends mixins(Vue) {
  @Prop({
    type: Boolean,
    default: false
  }) galleryLightboxState!: boolean;

  @Prop({
    type: Array,
    default: []
  }) gallery!: Array<GalleryModel>;

  @Prop({
    type: Number,
    default: 0
  }) currentGalleryIndex!: number;
}
</script>

<style lang="scss" scoped>
.lightbox-gallery {
  .icon-wrap {
    position: sticky;
    text-align: right;
    top: 17px;
    right: 17px;
  }
}
.thumb-nail {
  display: flex;
  overflow-x: auto;
  .img_viewed {
    width: 100%;
  }
  &__item {
    // width: 144px;
    flex: 0 0 144px;
    margin-right: 16px;
  }
  .thumb-nail__item {
    &:last-of-type {
      margin-right: 0;
    }
  }
}
.popup {
  .ico-close {
    top: 0;
    right: 0;
  }
}
@media (min-width: 768px){
	.popup__inner {
		max-width: 97vw;
  }
  .viewed-img {
    .img_viewed {
      max-height: 400px;
      object-fit: cover;
    }
  }
}
@media (min-width: 1024px){
	.popup__inner {
		max-width: 935px;
	}
}
</style>