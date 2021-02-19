<template>
  <div class="inquiry-thank-you__wrapper">
    <div class="inquiry-thank-you__container align-center">
      <h2 class="sub-heading__white">Thank you for your inquiry. Our customer service representative will get back to you as soon as possible.</h2>
      <div class="btn-container align-center"><button type="button" @click.stop="$emit('dismissInquiryThankYou')" class="primary-button__brown dismiss-btn ">Dismiss this message</button></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class InquiryThankYou extends Vue {
  
}
</script>
<style lang="scss" scoped>
.inquiry-thank-you__container {
  padding: 0 16px;
}
</style>