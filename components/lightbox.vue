<template>
  <aside class="overlay" v-if="lightboxState" @click="onClickOverlay($event)">
    <div :id="lightboxId" class="wrapper popup" :class="[wrapperClass]">
      <slot></slot>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";

@Component
export default class Lightbox extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) lightboxState!: boolean;
  @Watch('lightboxState')
  lightboxStateChanged() {
    if (this.lightboxState) {
      this.$nextTick(() => {
        let lightboxElWrapper = document.querySelector('#lightboxWrapper')!;
        this.$disableBodyScroll(lightboxElWrapper.firstElementChild);
        // this.$disableBodyScroll(window.document.documentElement.outerHTML);
      })
    } else {
      this.$clearAllBodyScrollLocks();
      setTimeout(() => {
        // if (window.scrollY > 0) document.body.classList.add('sticky-header')
      }, 100);
    }
  }

  @Prop({
    type: String,
    default: ''
  }) wrapperClass!: string;

  lightboxId: string = "lightboxWrapper";

  onClickOverlay(e: Event) {
    let el: HTMLElement = e.target as HTMLElement;
    if (el.id == this.lightboxId) {
      this.$emit('close');
      this.$root.$emit('resetInquiryLightbox');
    }
  }

  mounted() {
    this.$root.$on('closeLightboxes', () => {
      this.$emit('close');
    });
  }
}
</script>

<style lang="scss" scoped>

</style>