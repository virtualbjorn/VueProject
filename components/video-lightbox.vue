<template>
  <lightbox :lightboxState="videoLightboxState" :wrapperClass="'lightbox-video'" @close="$emit('closeVideoLightbox')">
    <div class="container popup__inner" style="top: 0; left: 0px;" tabindex="-1">
      <div class="popup__content focus-outline" role="document" tabindex="0">
        <button type="button" class="icon ico-close" @click.stop="$emit('closeVideoLightbox')"></button>
        <div class="video-container">
          <iframe class="iframe" height="400" :src="videoSrc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </lightbox>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class VideoLightbox extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) videoLightboxState!: boolean;

  @Prop({
    type: String,
    default: ''
  }) videoSrc!: string;
}
</script>
<style lang="scss" scoped>
.video-container {
  width: 100%;
  max-width: 900px;
  padding-top: 35px;
  .iframe {
    width: 100%;
  }
}
.popup__inner {
  // height: auto;
  height: 100vh;
}
@media (min-width: 768px) {
  .container {
    &.popup__inner {
      max-width: 97vw;
    }
  }
  .popup__inner {
    // height: auto;
    height: auto;
  }
}
@media (min-width: 1024px) {
  .container {
    &.popup__inner {
      max-width: 935px;
    }
  }
}
</style>