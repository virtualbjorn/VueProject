import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class VideoUtil extends Vue {
  getYouTubeVideoThumbnail(id: string): string {
    return `https://img.youtube.com/vi/${id}/default.jpg`
  }

  getYouTubeVideoEmbedSource(id: string): string {
    return 'https://www.youtube.com/embed/' + id;
  }
}
