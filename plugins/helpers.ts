import { Plugin } from '@nuxt/types'
import MobileDetect from 'mobile-detect'
import browser from 'browser-detect'
const StringIsNumber = value => isNaN(Number(value)) === false;

interface BrowserDetails {
  isTablet: boolean,
  isMobile: boolean,
  browser: string
}

declare module 'vue/types/vue' {
  interface Vue {
    $util: { 
      replaceDash(str: string, newChars: string): string,
      generateId(length: number): string,
      enumToArray(enumme: any, isBoolean?: boolean): Array<{ key: string, value: boolean | string }>,
      cbEnumToArray(enumme: any, isBoolean?: boolean): Array<{ key: string, value: boolean | string, disabled: boolean }>,
      scrollToSection(el: HTMLElement, refEl: HTMLElement, scrollBehavior?: ScrollIntoViewOptions, offsetTop?: number): void,
      browserDetails(): BrowserDetails
    },
    $gtm: {
      push(event: {event: string, page: any}): any
    }
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $util: { 
      replaceDash(str: string, newChars: string): string,
      generateId(length: number): string,
      enumToArray(enumme: any, isBoolean?: boolean): Array<{ key: string, value: boolean | string }>,
      cbEnumToArray(enumme: any, isBoolean?: boolean): Array<{ key: string, value: boolean | string, disabled: boolean }>,
      scrollToSection(el: HTMLElement, refEl: HTMLElement, scrollBehavior?: ScrollIntoViewOptions, offsetTop?: number): void,
      browserDetails(): BrowserDetails
    },
    $gtm: {
      push(event: {event: string, page: any}): any
    }
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $util: { 
      replaceDash(str: string, newChars: string): string,
      generateId(length: number): string,
      enumToArray(enumme: any, isBoolean?: boolean): Array<{ key: string, value: boolean | string }>,
      cbEnumToArray(enumme: any, isBoolean?: boolean): Array<{ key: string, value: boolean | string, disabled: boolean }>,
      scrollToSection(el: HTMLElement, refEl: HTMLElement, scrollBehavior?: ScrollIntoViewOptions, offsetTop?: number): void,
      browserDetails(): BrowserDetails
    }
  }
}

let md = new MobileDetect(window.navigator.userAgent);
let browserDetails = browser();

const helperPlugins: Plugin = (context, inject) => {
  inject('util', {
    replaceDash(str: string, newChars: string): string {
      return str.replace(/-/g, newChars);
    },
    generateId(length: number): string {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    enumToArray(enumme: any, isBoolean?: boolean): Array<{ key: string, value: boolean | string }> {
      return Object.keys(enumme).filter(StringIsNumber).map(key => { return { key: enumme[key], value: isBoolean ? false : '' }});
    },
    cbEnumToArray(enumme: any, isBoolean?: boolean): Array<{ key: string, value: boolean | string }> {
      return Object.keys(enumme).filter(StringIsNumber).map(key => { return { key: enumme[key], value: isBoolean ? false : '', disabled: false }});
    },
    scrollToSection(el: HTMLElement, refEl: HTMLElement, scrollBehavior?: ScrollIntoViewOptions, offsetTop: number = 0): void {
      refEl.scrollTo({
        top: el.offsetTop + offsetTop,
        left: 0,
        behavior: 'smooth'
      });
    },
    browserDetails(): BrowserDetails {
      return {
        isTablet: !!md.tablet(),
        isMobile: !!md.mobile() && !md.tablet(),
        browser: (md.userAgent() || browserDetails.name!).toLowerCase()
      }
    }
  });
}
export default helperPlugins