<template>
  <!-- Home Page -->
  <div id="app"></div>
</template>
<script lang="ts">
import { Vue, Component, Prop, mixins } from 'nuxt-property-decorator';
import { TruckTypes } from '@/models/product';
import HomeSlider from '@/components/home-slider.vue';
import TruckTypeFilter from '@/components/truck-type-filter.vue';
import ProductsListing from '@/components/products-listing.vue';
import { CarouselItem } from '@/models/featured-carousel-slider';
import Sorting from '../util/sorting';

@Component({
  components: {
    HomeSlider,
    ProductsListing
  },
  head: {
    title: "Home",
    bodyAttrs: {
      class: "home-page"
    }
  }
})
export default class IndexPage extends mixins(Sorting) {
  truckTypeIndex: number = 0;
  homeData: any = {};

  get brands() {
    return this.$accessor.brands.items || [];
  }

  created() {
    this.$accessor.home.getHomeData().then((responseData: any) => {
      this.homeData = responseData.data;
    });
    this.$accessor.brands.getAllBrands();
  }

  updateTruckTypeIndex(truckType: number) {
    this.$forceUpdate();
    this.truckTypeIndex = truckType;
  }

  showInquiryLightbox() {
    this.$root.$emit('show-inquiry-lightbox');
  }

  tobrandsLink(brandName: string) {
    return `/${brandName.replace(/\s/g, '-').toLowerCase()}`;
  }
}
</script>
<style lang="scss" scoped>
.container-btn {
  width: 100%;
}
.products__landing {
  .product-result {
    margin-top: 49px;
  }
}
.see-our-products-btn {
  margin-top: 20px;
  color: #8F0101;
  background: rgba(219, 191, 173, 0.1);
}
.home-page {
  position: relative;

  .banner {
    background: url("~assets/images/banner-bg-mobile.jpg") no-repeat center center transparent;
    color: #fff;
    padding: 92px 16px;
    background-size: cover;

    &__title {
      // padding-top: 125px;brands
      text-align: left;
      line-height: 45px;

      margin-bottom: 20px;
    }
    .title_para {
      line-height: 29px;
    }

    .carousel {
      // height: 514px;
      // width: 450px;
      max-width: 425px;
      height: auto;
      // position: absolute;
      left: 15px;
      // bottom: -30%;
    }

    .carousel-container {
      position: relative;
    }

    .content {
      ul {
        list-style: none;
        padding: 0 20px;
        display: flex;
        text-align: center;

        li {
          display: inline-block;
          // margin-right: 40px;
          margin-right: 25px;
          text-decoration-line: underline;
          flex: 0 0 30%;

          &:last-child {
            margin-right: 0;
          }

          a {
            cursor: pointer;
            font-family: 'Coda', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          }
        }
      }

      .content-para {
        margin-bottom: 40px;
      }
    }
  }

  .inquires-products {
    .heading {
      margin-top: 40px;
      margin-bottom: 24px;
    }

    
  }
  .btn-group {
      margin-top: 35px;

      .primary-button {
        margin: 0 auto;
        display: block;
        width: 215px;
        height: 40px;
        padding: 0;

        margin-bottom: 16px;
      }

    }
    // .see-our-products-btn {
    //   margin-top: 20px;
    //   color: #8F0101;
    //   background: rgba(219, 191, 173, 0.1);
    // }

  .products {
    position: relative;
    // margin-top: 100px;
    margin-top: 67px;
    padding-top: 33px;
    margin-bottom: 100px;
    background-color: #dbbfad1a;
    padding-bottom: 30px;

    .product-result {
      padding: 0 15px;
      margin-bottom: 54px;



      .product-result-img {
        height: auto;
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      .product-result-content {
        padding: 9px 0 0 0;
      }

      .price-content {
        margin-bottom: 18px;
        padding: 0 20px 0 10px;


        .price-wrap {
          display: inline-block;
          float: right;
        }
      }

      .model-wrap {
        border-bottom: 1px solid #FFEDED;
        padding: 0 8px 7px 8px;
        margin-bottom: 12px;
      }

      .truck-details {
        display: grid;
        grid-template-columns: 27% 40% 33%;
        margin-bottom: 13px;
        padding: 0 7px;
        height: 65px;
      }

      .more-detail-cont {
        background: #8F0101;
        color: #fff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        .more-detail-btn {
          padding: 7px 0;
          width: 100%;
        }
      }
    }

    .more-result {
      text-align: center;

      .see-all {
        color: #8F0101;
        font-size: 16px;
        text-decoration: none;
      }
    }

    .heading {
      margin-bottom: 65px;
    }
  }
  .products {
    margin-top: 0;
  }

  .brands {
    padding: 0 30px;

    &__heading {
      margin-bottom: 32px;
    }

    .sub-heading {
      color: #000000;
      font-size: 24px;
      font-weight: 400;
      text-align: center;
      margin-bottom: 110px;
      line-height: 42px
    }

  }
  

  .spare-parts {
    padding: 15px 15px 50px 15px;

    &__title {
      margin-bottom: 61px;
      text-align: center;
    }

    &__logo {
      text-align: center;

      img {
        &:nth-child(1) {
          margin-right: 61px;
          margin-bottom: 41px;
        }

        &:nth-child(2) {
          margin-right: 45px;
          margin-bottom: 35px;
        }

        &:nth-child(3) {
          margin-bottom: 42px;
        }

        &:nth-child(4) {
          margin-bottom: 58px;
          width: 220px;
          margin-right: 25px;
        }

        &:nth-child(5) {
          width: 193px;
          height: 48px;
          margin-bottom: 70px;
          display: inline-block;
          vertical-align: top;
        }

        &:nth-child(6) {
          margin-bottom: 35px;
        }

        &:nth-child(7) {
          margin-bottom: 35px;
        }

        &:nth-child(8) {
          margin-right: 45px;
          margin-bottom: 35px;
        }

        &:nth-child(9) {
          margin-right: 45px;
          margin-bottom: 35px;
        }

        &:nth-child(10) {
          margin-right: 45px;
          margin-bottom: 35px;
        }

        &:nth-child(11) {
          margin-right: 45px;
          margin-bottom: 35px;
        }

        &:nth-child(12) {
          margin-right: 45px;
          margin-bottom: 35px;
        }

        &:nth-child(13) {
          margin-right: 45px;
          margin-bottom: 35px;
        }

      }

    }
  }


  .about {
    padding: 50px 16px;

    &__heading_wrap {
      margin-bottom: 10px;
    }

    .title {
      margin-right: 14px;
    }

    .description_title {
      margin-bottom: 11px;
    }

    &__btn-cont {
      text-align: center;

      .link {
        margin-top: 18px;
      }
    }
  }

  .footer-bg {
    background: url("~assets/images/home-mobile-bg.jpg") center center no-repeat;
    background-size: cover;
  }

}
.brands-content {
  margin-bottom: 100px;
  // text-align: center;
  display: grid;
  grid-template-rows: 1fr;

  .content {
    grid-column: 1;
    grid-row: 2;
  }

  .heading {
    // text-align: center;
    line-height: 51px;
    margin-bottom: 20px;
  }

  .content-para {
    margin-bottom: 40px;
  }

  .see-all {
    background-color: #fff5f5;
    color: #8F0101;
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
    &:hover {
      background-color: rgba(80, 67, 59, 0.1);
    }
  }

  .logo {
    margin-bottom: 35px;

    img {
      width: 100%;
    }
  }
}
.show-on-desktop {
  display: none;
}
.section--microsite {
  background-color: #fafafa;
  padding: 20px 0 100px;
}
.section--business-services{
	background-color: #fdfbf9;
	font-size: 18px;
	text-align: center;
	line-height: 1.7;	
	padding-top: 124px;
	position: relative;

	img{
		width: 207px;
		display: block;
		margin: 0 auto;
  }
  &:nth-child(3){
    .services--icon{
      width: 168px;
    }
  }
  .heading {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.4;

    color: #2F180F;
    text-align: center;

    margin: 0 0 20px 0;
  }
}
.section-wrapper{
	background-color: #fbf6f5;
	padding: 80px 9px 10px;
    // padding: 80px 15px 15px;
    /* transform: translateY(-57px); */
	/* z-index: -1; */
	background-repeat: no-repeat;
	
	// background-size: 162px;
	margin-top: -58px;
	height: 410px;

	&.left-bg{
		background-image: url("~assets/images/microsite/square-group-left.png");
		background-position: 15% 90%;		

		.section-number{
			left: 30px;
    		bottom: 25px;
		}

	}

	&.right-bg{
		background-image: url("~assets/images/microsite/square-group-right.png");
		background-position: 84% 95%;

		.section-number{
			right: 30px;
			bottom: 15px;
		}
	}

	&.wrapper-1{
		p{
			padding: 0 4px;
		}
	}

	&.wrapper-2{
		margin-top: -78px;
	}

	&.wrapper-3{
		margin-top: -82px;
		padding: 100px 9px 10px;

		p{
			padding: 0 4px;
		}
	}

	&.wrapper-4{
		margin-top: -35px;
	}
	
	.section-number{
		width: auto;
    /* text-align: right; */
		position: absolute;

	}
}

@media (min-width: 768px) {
  .home-page {
    .banner {
      background: url("~assets/images/banner-bg-desktop.jpg") no-repeat left -71px transparent;
      background-size: cover;
      // background: none;
      padding: 30px 25px 92px 25px;
    }

    .brands {
      .brands-content {
        // grid-template-columns: 60% 37%;
        // grid-column-gap: 27px;
        margin-bottom: 140px;

        .content {
          padding: 0 30px;
          // grid-column: 1;
          // grid-row: 1;
        }

        .logo {
          // grid-column: 2;
          grid-row: 1;

          img{
            margin-top: 20px;
          }
        }
      }
    }

  .footer-bg {
      background: url("~assets/images/home-desktop-bg.jpg") center center no-repeat;
      background-size: cover;
    }
  }
  .section--business-services{
		img{
			position: relative;
			z-index: 1;
		}
  }
  .section-wrapper{
		margin-left: 60px;
		margin-right: 60px;
		position: relative;
	}
}

@media (min-width: 1024px) {
  .home-page {
    .banner {
      padding-top: 50px;
      .content {
        ul {
          padding: 0;
          text-align: left;
        }
      }
		}
    .inquires-products {
      
    }
    .btn-group {
      display: flex;
      justify-content: center;
      align-items: center;
      
      .primary-button {
        margin: 0;
        width: 278px;
        height: 61px;
      }

      .inquire-now-btn {
        margin-right: 12px;
      }
    }
     .products {
      .more-result {
        .see-all {
          max-width: 356px;
        }
      }
    }
    .footer-bg {
      background: url("~assets/images/home-desktop-bg.jpg") center center no-repeat;
      background-size: cover;
    }
  }
  .brands-content {
    // grid-template-columns: 60% 37%;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 27px;
    .content {
      grid-column: 1;
      grid-row: 1;
    }

    .logo {
      grid-column: 2;
      grid-row: 1;

      img{
        margin-top: 20px;
        padding: 0 30px;
      }
    }
   .product-option-wrap {
     grid-template-rows:260px 1fr auto;
   }
  }
}
@media (min-width: 1080px) {
  .brands-content {
    .logo {
      img {
        padding: 0 50px;
      }
    }
  }
  .home-page {
    .banner {
      padding-top: 80px;
    }
  }
  .section--business-services{

		width: 1000px;
		margin: 0 auto;
	
		&.right-detail{
			img{
				right: 7%;
			}

			.show-on-desktop{
				text-align: right;
				float: left;
				h1{
					text-align: right;
				}
			}
		}

		&.left-detail{
			.show-on-desktop{
				text-align: left;
				float: right;
				h1{
					text-align: left;
				}
			}
		}

		.show-on-desktop{
			display: block;
			width: 50%;
			
			z-index: 3;
			position: relative;

			h1{
				font-size: 40px;
				line-height: 1.2;
			}
	

		}
		.services--icon{
			top: 29%;
			position: absolute;
			// right: 16%;
		}
		.section-wrapper{
			width: 465px;
			height: 505px;
    		margin: 0 auto;

			h1, p{
				display:none;
			}

			&.right-bg{
				margin-left: 40%;


			}
			&.left-bg{
				margin-right: 40%;
			}
		}

		&:nth-child(1){

			.show-on-desktop{
				width:60%;
				transform: translate(14px, 170px);
			}
			.services--icon{
				width: 292px;
			}
		}

		&:nth-child(2){
			.show-on-desktop{
				// width:50%;
				transform: translate(-45px, 112px);
			}
			.services--icon{
				width:348px;
				top: 7%;
				left: 3%;
			}
		}

		&:nth-child(3){
			.show-on-desktop{
				// width: 50%;
				transform: translate(98px, 200px);
			}
			.services--icon{
				width: 230px;
				right: 3%;
				top: 22%;
			}
		}

		&:nth-child(4){
			.show-on-desktop{
				width: 49%;
				transform: translate(-45px, 196px);
			}
			.services--icon{
				width: 368px;
				left: -5%;
				top: 25%;
			}
		}
	}
}

@media (min-width: 1280px) {
  .brands-content {
    grid-column-gap: 97px;
    .logo {
      img {
        padding: 0 80px;
      }
    }
  }
  .home-page {
    .banner {
      padding-top: 41px;
      .banner-wrap {
        grid-template-columns: 28% 68%;
        grid-column-gap: 35px;
        width: 100%;
      }
    }
  }
}

@media (min-width: 1365px) {
  .brands-content {
    .logo {
      img {
        padding: 0;
      }
    }
  }
  .home-page {

    .one-half {
      width: 48.9%;
    }

    .form-input-cont {
      display: inline-block;
    }

    .social-media {
      padding: 13px 135px 14px 135px;

      &__icon-container {
        .follow-us {
          display: inline-block;
        }

        .social-media-icon {
          vertical-align: middle;
        }
      }
    }

    .header {
      .navigation {
        display: inline-block;
        list-style: none;

        li {
          display: inline-block;
          margin-right: 28px;
        }
      }

      &__contact {
        padding: 18px 135px 14px 135px;
      }

      &__nav {
        padding: 26px 136px 16px 136px;

        .desktop-header-logo {
          width: 280px;
          height: 60px;
        }

        .mobile-logo {
          display: none;
        }

        .header-nav-logo {
          .desktop-header-logo {
            display: inline-block;
          }
        }
      }

      .inquire-now-btn {
        padding: 16px 0;
        width: 160px;
      }

      .menu-bar-list {
        display: none;
      }
    }

    .banner {
      padding: 45px 135px 145px 135px;
      // background: url("~assets/images/banner-bg-desktop.jpg") no-repeat center center transparent;
      // background-size: cover;

      &__title {
        padding-top: 0;
        margin-top: 44px;
      }

      .banner-wrap {
        display: grid;
        // grid-template-columns: 36% 62%;
        // grid-column-gap: 20px;
        grid-template-columns: 28% 68%;
        grid-column-gap: 35px;
        // padding-top: 80px;
        width: 100%;

        .carousel-container {
          .carousel {
            position: relative;
            height: 514px;
            width: 100%;
            bottom: 0;
            left: 0;
          }
        }
      }
    }

    .inquires-products {
      padding-top: 105px;
      padding-bottom: 170px;

      .heading {
        margin-top: 0;
      }

      .product-inquires-para {
        width: 80%;
        margin: 0 auto;
      }

      .phone {
        top: -10px;
      }
    }

    .products {
      margin-top: 0;

      .product-result {
        // padding: 0 240px;
        padding: 0;
        margin-bottom: 40px;

        .product-option-wrap {
          margin-bottom: 90px;
        }
      }

      .heading {
        line-height: 51px;
        margin-bottom: 50px;
      }
    }

    .brands {
      padding: 0 180px;

      &__heading {
        line-height: 51px;
      }

      .sub-heading {
        width: 75%;
        margin: 0 auto;
        margin-bottom: 95px;
      }

      .brands-content {
        .content {
          .heading {
            text-align: left;
          }
        }

        .logo {
          margin-bottom: 0;

          img {
            width: 100%;
          }
        }
      }
    }

    .about {
      padding: 60px 240px;

      &__btn-cont {
        text-align: left;
      }
    }

    .filter {

      &__drive {
        display: inline-block;
        margin-right: 58px;
      }

      &__brand {
        display: inline-block;
      }
    }

    .spare-parts {
      padding: 70px 159px 48px 159px;

      &__title {
        text-align: left;
      }

      &__logo {
        text-align: left;

        img {
          &:nth-child(3) {
            margin-right: 61px;
          }

          &:nth-child(6) {
            margin-right: 87px;
            margin-bottom: 69px;
          }

          &:nth-child(7) {
            margin-right: 87px;
            margin-bottom: 69px;
          }

          &:nth-child(8) {
            margin-bottom: 69px;
          }

          &:nth-child(9) {
            margin-right: 0;
            margin-bottom: 69px;
          }

          &:nth-child(10) {
            margin-right: 81px;
          }

          &:nth-child(11) {
            margin-right: 81px;
          }

          &:nth-child(12) {
            margin-right: 81px;
          }

          &:nth-child(13) {
            margin-right: 0;
          }
        }
      }
    }

    .footer-bg {
      background: url("~assets/images/home-desktop-bg.jpg") center center no-repeat;
      background-size: cover;
    }
  }
}
@media (min-width: 1600px) {
  .home-page {
    .banner {
      padding: 45px 0 145px;
      .banner-wrap {
        grid-template-columns: 30% 68%;
      }
    }
  }
}
</style>
