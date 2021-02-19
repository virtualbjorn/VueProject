<template>
  <div class="app">
    <div class="breadcrumbs" v-if="isBreadcrumbsEnabled" :key="breadcrumbsComponentKey">
      <span><n-link to="/">Home</n-link></span>
      <template v-for="(breadcrumb, bIdx) in breadcrumbsArray">
        <div :key="bIdx" class="breadcrumbs-item">
          <em class="chevron-right-gray icon"></em>
          <span><n-link :to="breadcrumb.url" :class="{'nuxt-link-exact-active': urlFullPath === breadcrumb.url}">{{ breadcrumb.name }}</n-link></span>
        </div>
      </template>
    </div>
    <main id="main" class="main">
      <nuxt />
    </main>
    <transition name="lightbox">
      <inquiry-lightbox :inquiryLightboxState="showInquiryLightbox" :product="product" @closeInquiryLightbox="closeInquiryLightbox"></inquiry-lightbox>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, mixins } from 'nuxt-property-decorator';
import InquiryLightbox from '@/components/inquiry-lightbox.vue';
import { Product, ProductItemLink } from '@/models/product';
import { Question } from '@/models/forms';
import ProductUtil from '@/util/product-util';
import { Brand } from '@/models/brands';

declare var _: any;

@Component({
  components: {
    InquiryLightbox
  },
  middleware: 'resetForms'
})
export default class Default extends mixins(Vue, ProductUtil) {
  breadcrumbsComponentKey: string = this.$util.generateId(10);
  navigationElements: Array<HTMLElement> = [];
  burgerMenuBtn!: HTMLElement;
  contactTooltipBtn!: HTMLElement;

  showInquiryLightbox: boolean = false;
  product: any = {};

  @Watch('$route.fullPath')
  onPathChange() {
    this.$gtm.push({
      event: 'pageview',
      page: {
        path: this.$route.fullPath
      }
    })
    this.navigationActive();
  }

  get urlFullPath() {
    return this.$route.fullPath;
  }

  get isBreadcrumbsEnabled(): boolean {
    return this.$route.fullPath !== '/' && typeof window['__PRERENDER_INJECTED'] == 'undefined';
  }

  get breadcrumbsArray(): Array<{name: string, url: string}> {
    if (this.isBreadcrumbsEnabled) {
      this.breadcrumbsComponentKey = this.$util.generateId(10);
      let routes =_.compact(this.$route.fullPath!.split('?')[0].split('/'));
      if (/brand-type-all/i.test(this.$route.name!)) {
        return [
          { name: 'Our Products', url: '/our-products' },
          { name: this.productItemQueryName, url: this.$route.fullPath }
        ]
      }
      return _.map(routes, (route, rIdx: number) => {
        if (route === 'item') {
          return { name: this.replaceEnDash(this.$route.query.brand as string, ' ') + ' ' + this.replaceEnDash(this.$route.query.model as string, ' ') + ' ' + this.replaceEnDash(this.$route.query.type as string, ' '), url: this.$route.fullPath };
        } else if (this.$route.query.truckType) {
          return { name: this.$util.replaceDash(route, ' '), url: this.$route.fullPath }
        } else if (route === 'brands') {
          let brandName = this.$route.query.name as string;
          switch(brandName.toLowerCase()) {
            case 'brand-1':
              brandName = 'brand-1';
              break;
            case 'brand-2':
              brandName = 'brand-2';
              break;
            case 'brand-3':
              brandName = 'brand-3';
              break;
          }
          return { name: brandName, url: this.$route.fullPath }
        } else if (route === 'brand-4') {
          return { name: 'brand-4', url: this.$route.fullPath }
        } else {
          return { name: this.$util.replaceDash(route, ' '), url: '/' + route }
        }
      });
    }
    return [];
  }

  get productItemQueryName() {
    let productItemQuery = _.cloneDeep(this.$accessor.products.productDetailsQuery) as ProductItemLink;
    if (_.isEmpty(productItemQuery)) return 'Loading Product';
    return `${productItemQuery.brand} ${productItemQuery.model} ${productItemQuery.type}`; 
  }

  get itemNav() {
    return this.$accessor.brands.itemNav;
  }

  mounted() {
    document.body.removeAttribute('v-cloak');
    this.addBrowserClass();
    // window.addEventListener('scroll', this.handleScroll, true);
    this.animationLoop();
    window.document.querySelector('#headerInquire')!.addEventListener('click', this.inquiryLightbox);

    this.burgerMenuBtn = window.document.querySelector('#burgerMenuBtn') as HTMLElement;
    let mobileMenuList = window.document.querySelector('#mobileMenuList')!;
    let headerTagEl = window.document.querySelector('header') as HTMLElement;
    this.burgerMenuBtn.addEventListener('click', () => {
      if (mobileMenuList.classList.contains('hidden')) {
        if (headerTagEl.classList.contains('is-sticky')) headerTagEl.style.position = 'fixed';
        this.$disableBodyScroll(mobileMenuList);
        mobileMenuList.classList.remove('hidden');
        this.burgerMenuBtn.classList.add('burger-expand');
      } else {
        headerTagEl.removeAttribute('style');
        this.$clearAllBodyScrollLocks();
        mobileMenuList.classList.add('hidden');
        this.burgerMenuBtn.classList.remove('burger-expand');
      }
    });
    this.contactTooltipBtn = window.document.querySelector('#tooltipBtn') as HTMLElement;
    this.contactTooltipBtn.addEventListener('click', () => {
      this.contactTooltipBtn.previousElementSibling!.classList.toggle('show');
    });
    this.navigationListing(headerTagEl, 'nav');
    this.navigationActive();
    this.questionForm();
    this.$root.$on('show-inquiry-lightbox', this.inquiryLightbox);
    this.$root.$on('show-product-inquiry-lightbox', this.productInquiryLightbox);
    window.onpopstate = () => {
      this.$root.$emit('closeLightboxes');
      this.$clearAllBodyScrollLocks();
    }
    if (typeof window['__PRERENDER_INJECTED'] == 'undefined') {
      this.$accessor.brands.getAllBrandShort().then(() => {
        this.attachBrandLinkFooters(headerTagEl);
      });
    }
  }

  navigationActive() {
    _.each(this.navigationElements, (el: HTMLElement) => {
      let navEl: HTMLElement = el.querySelector('.nav-state') as HTMLElement;
      if (!navEl) return;
      let navRegex = new RegExp(_.escapeRegExp(el.getAttribute('href')!), 'i');

      navEl.classList.remove('active');
      if (navRegex.test(this.$route.path) && this.$route.fullPath !== '/') {
        navEl.classList.add('active');
      }
    });
  }

  navigationListing(headerTagEl: HTMLElement, attr: string) {
    this.navigationElements = [...this.navigationElements, ...Array.prototype.slice.call(document.querySelectorAll(`a[${attr}]`))];
    _.each(this.navigationElements, (el: HTMLElement) => {
      el.addEventListener('click', (evt: Event) => {
        evt.preventDefault();
        let anchorTagHref = el.getAttribute('href') || '/';
        let mobileMenuList = window.document.querySelector('#mobileMenuList')!;
        if(!mobileMenuList.classList.contains('hidden')) {
          headerTagEl.removeAttribute('style');
          mobileMenuList.classList.toggle('hidden');
          this.$clearAllBodyScrollLocks();
          this.burgerMenuBtn.classList.remove('burger-expand');
        }
        this.$router.push(anchorTagHref);
      });
    });
  }

  footerBrandLink(brandName: string) {
    return `<a class="footer-widget__link" href="/${brandName.replace(/\s/g, '-').toLowerCase()}" brand-nav><span class="page-body__white block">${brandName}</span></a>`;
  }

  attachBrandLinkFooters(headerTagEl: HTMLElement) {
    let brandMount: HTMLElement = document.querySelector('#brand__mount') as HTMLElement;
    _.each(this.itemNav, (nav: Brand) => {  
      let newNode = new DOMParser().parseFromString(this.footerBrandLink(nav.name), 'text/html');
      brandMount.parentNode!.insertBefore(newNode.body.firstChild!, brandMount)
    });
    this.navigationListing(headerTagEl, 'brand-nav');
  }

  addBrowserClass() {
    let { browser, isTablet, isMobile } = this.$util.browserDetails();
    let browserDevice: string = "";
    document.documentElement.classList.add(`browser-${browser}`);
    if (isTablet) {
      browserDevice = 'browser-tablet';
    } else if (isMobile) {
      browserDevice = 'browser-mobile';
    }
    if (browserDevice) document.documentElement.classList.add(browserDevice);
  }

  inquiryLightbox() {
    this.showInquiryLightbox = true;
  }

  productInquiryLightbox(product: Product) {
    this.showInquiryLightbox = true;
    this.product = product;
  }

  closeInquiryLightbox() {
    this.showInquiryLightbox = false;
    this.product = null;
  }

  questionForm() {
    let formElement: HTMLElement = document.querySelector('#questionForm') as HTMLElement;
    let thankYouWrapper: HTMLElement = document.querySelector('#footerThankYou') as HTMLElement;
    let btn = thankYouWrapper.querySelector('#footerThankYouBtn') as HTMLButtonElement;
    btn.addEventListener('click', (e) => {
      thankYouWrapper.classList.toggle('hidden');
      formElement.classList.toggle('hidden');
    });
    if (!formElement) return;
    formElement.addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      let questionData: Question = new Question();
      let formFields: Array<HTMLInputElement> = Array.prototype.slice.call(formElement.querySelectorAll('.form-field'));
      if (formFields.length) {
        _.each(formFields, (field: HTMLInputElement) => {
          questionData[field.id] = field.value;
        });
        let validated = _.chain(questionData)
          .values()
          .filter((data: any) => !!data)
          .value()
          .length;
        if (!validated) return;
        
        questionData.referral_link = this.$route.fullPath;
        this.$accessor.forms.question({
          data: questionData
        }).then(response => {
          _.each(formFields, (field: HTMLInputElement) => {
            field.value = "";
          });
          formElement.classList.toggle('hidden');
          thankYouWrapper.classList.toggle('hidden');
        }).catch(err => {
          // console.log(err);
        });
      }
    });
  }

  animationLoop() {
    let headerTagEl = window.document.querySelector('header') as HTMLElement;
    if (window.scrollY > 120) {
      if (headerTagEl) headerTagEl.classList.add('is-sticky');
    } else {
      if (headerTagEl) headerTagEl.classList.remove('is-sticky');
    }
    requestAnimationFrame(this.animationLoop);
  }
}
</script>
<style lang="scss" scoped>
.nuxt-link-exact-active {
  font-weight: bold;
}
.breadcrumbs {
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  overflow-x: auto;
  // margin: 26px 20px 0;
  margin-right: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { 
    display: none;
  }
  // align-items: center;
  &-item {
    margin-left: 5px;

    a {
      text-transform: capitalize;
    }
  }
}
@media (min-width: 768px) {
  .breadcrumbs {
    margin-right: 0;
  }
  .news-article,
  .news-listing {
    .breadcrumbs {
      padding: 26px 20px;
    }
  }
  .products-brand {
    .breadcrumbs {
      padding: 26px 20px 0;
      max-width: 1032px;
      margin: 0 auto;
    }
  }
  .products-page,
  .product-item {
    .breadcrumbs {
      padding: 26px 30px 0;
      max-width: 1032px;
      margin: 0 auto;
    }
  }
}
@media (min-width: 1024px) {
  .about,
  .art-care,
  .contact-us {
    .breadcrumbs {
      padding: 26px 100px 0;
      max-width: 1366px;
      margin: 0 auto;
    }
  }
  .news-article,
  .news-listing {
    .breadcrumbs {
      margin: 0 auto;
      max-width: 1366px;
      padding: 26px 100px 34px;
    }
  }
  .products-brand {
    .breadcrumbs {
      padding: 26px 100px;
    }
  }
  .products-page,
  .product-item {
    .breadcrumbs {
      // padding: 26px 30px 0;
    }
  }
  .faq,
  .privacy-policy,
  .sobida,
  .terms-and-condition {
    .breadcrumbs {
      margin: 0 auto;
      padding: 26px 100px 0;
      max-width: 1366px;
    }
  }
}
// SPECIAL CASE FOR BREADCRUMBS
@media (min-width: 1040px) {
  .products-brand {
    .breadcrumbs {
      max-width: none;
      padding: 26px 100px;
    }
  }
  .products-page,
  .product-item {
    .breadcrumbs {
      padding: 26px 0 0;
    }
  }
}
@media (min-width: 1200px) {
  .products-brand {
    .breadcrumbs {
      padding: 26px 100px;
    }
  }
}
@media (min-width: 1235px) {
  .products-brand {
    .breadcrumbs {
      max-width: 1032px;
      padding: 26px 0;
    }
  }
}
@media (min-width: 1280px) {
  .products-brand {
    .breadcrumbs {
      padding: 26px 0;
    }
  }
}
@media (min-width: 1366px) {
  .art-care {
    .breadcrumbs {
      // padding: 26px 0;
    }
  }
}
@media (min-width: 1600px) {
  .about {
    .breadcrumbs {
      padding: 26px 0 0;
    }
  }
  .art-care {
    .breadcrumbs {
      padding: 26px 0;
    }
  }
  .contact-us {
    .breadcrumbs {
      padding: 26px 0;
    }
  }
  .news-article,
  .news-listing {
    .breadcrumbs {
      padding: 26px 0 34px;
    }
  }
  .faq,
  .privacy-policy,
  .sobida,
  .terms-and-condition {
    .breadcrumbs {
      padding: 26px 0;
    }
  }
}
</style>