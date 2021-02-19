import { Vue, Component } from "nuxt-property-decorator";
declare const _: any;

@Component
export default class CarouselUtil extends Vue {
  private getIframe(youtubeId: string) {
    return `<iframe width="727" height="409" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  }

	parseToCarouselItems(rawCarouselData: any, brandName?: string) {
    return _.map(_.cloneDeep(rawCarouselData), (carousel: any) => {
      let parsedData;
      if (carousel.type == 'product') {
        parsedData = carousel.product;
        let featured = parsedData.featured_carousels[0] || {};
        parsedData.featured_carousel_item = { type: "photo" };
        parsedData.featured_carousel_item.data = {
          desktop_image: featured.desktop_img,
          mobile_image: featured.mobile_img,
          thumbnail: featured.thumb_img,
          desktop_alt: carousel.desktop_alt,
          thumbnail_alt: carousel.thumb_alt
        }
        if (!_.isEmpty(featured)) {
          parsedData.featured_carousel_item.data.upper_right_texts = featured.upper_right_text ? featured.upper_right_text.split("|") : [];
          parsedData.featured_carousel_item.data.lower_right_text = featured.lower_right_text || "";
        }
        // parsedData.brand_logo = parsedData.brand ? parsedData.brand.logo : "";
        parsedData.brand = parsedData.brand;
      } else if (carousel.type == 'video') {
        parsedData = {
          brand: brandName || '',
          embed: this.getIframe(carousel.youtube_id),
          thumbnail: `https://i.ytimg.com/vi/${carousel.youtube_id}/maxresdefault.jpg`,
          thumbnail_alt: carousel.thumb_alt || ''
        }
      } else if (carousel.type === "photo") {
        carousel.type = "photo";
        parsedData = {
          thumbnail: carousel.thumb_img,
          desktop_image: carousel.desktop_img,
          mobile_image: carousel.mobile_img,
          upper_right_texts: carousel.upper_right_text ? carousel.upper_right_text.split("|") : [],
          lower_right_text: carousel.lower_right_text || "",
          desktop_alt: carousel.desktop_alt,
          thumbnail_alt: carousel.thumb_alt
        }
      } else {
        if (carousel.model) {
          parsedData = _.cloneDeep(carousel);
          carousel.type = "product";
          let featured = parsedData.featured_carousels[0] || {};
          parsedData.featured_carousel_item = { type: "photo" };
          parsedData.featured_carousel_item.data = {
            desktop_image: featured.desktop_img,
            mobile_image: featured.mobile_img,
            thumbnail: featured.thumb_img,
            desktop_alt: featured.desktop_alt,
            thumbnail_alt: featured.thumb_alt
          }
          if (!_.isEmpty(featured)) {
            parsedData.featured_carousel_item.data.upper_right_texts = featured.upper_right_text ? featured.upper_right_text.split("|") : [];
            parsedData.featured_carousel_item.data.lower_right_text = featured.lower_right_text || "";
          }
          // parsedData.brand_logo = parsedData.brand ? parsedData.brand.logo : "";
          parsedData.brand = parsedData.brand;
        }
      }
      return {
        type: carousel.type,
        data: parsedData
      }
    });
  }
}
