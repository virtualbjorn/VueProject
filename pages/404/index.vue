<template>
	<div class="page-404">
    <section>
      <div class="heading-content">
        <h1 class="heading align-center">Page cannot be found</h1>
        <h2 class="sub-heading align-center">We can’t find the page that you’re looking for.</h2>

        <div class="back-to-home-container align-center">
          <n-link tag="button" to="/" class="primary-button back-to-home">BACK TO HOME</n-link>
        </div>
      </div>

      <div class="search-bar__content-wrap" v-if="false">
        <h2 class="sub-heading align-center">Or try searching for a product or news</h2>
      
        <div class="search-bar__content">
          <div class="search-bar__input-wrap">
            <button class="search-bar__ico-wrap">
              <span class="icon ico-search"></span>
            </button>
            <input type="text" placeholder="Try searching for products or news" class="search-bar__input" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

declare var _: any;
@Component({
  head: {
    title: "Project | 404",
    bodyAttrs: {
      class: "page-404"
    }
  }
})
export default class Project404 extends Vue {

}
</script>

<style lang="scss" scoped>

  .page-404 {
    padding: 210px 20px 300px 20px;

     .sub-heading {
        color:#333;
      }
    .heading-content {
      .heading {
        margin-bottom: 20px;
      }
     
    }

    .back-to-home-container {
      margin:40px 0 60px 0;
    }
    .back-to-home {
      width: 100%;
    }
  }
  .search-bar {
      min-height: 500px;
      padding: 0 16px;

      &__content {
        background: #FFF7F1;
        border-radius: 8px;

        margin: 18px 0;
      }

      &__input-wrap {
        display: flex;
        padding: 16px 22px;
      }

      &__input {
        width: 100%;
        margin-left: 17px;
      }
    }

  @media (min-width: 1024px) {
    .page-404 {
      .back-to-home {
        width: 765px;
      }
      .heading {
        font-size: 36px;
      }
      .sub-heading {
        font-size: 24px;
      }
    }
  }

  @media (min-width: 1365px) {
      .page-404 {
        padding: 210px 140px 300px 140px;
      }
  }
</style>
