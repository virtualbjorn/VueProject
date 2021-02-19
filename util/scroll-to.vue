<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
declare var _: any;

@Component
export default class ScrollTo extends Vue {

  scrollToElement(scrollElement: HTMLElement) {
    let elFromTop = scrollElement.offsetTop;
    window.scrollTo(0, elFromTop);
  }

  smoothScrollToElement(scrollElement: HTMLElement) {
    let elFromTop = scrollElement.offsetTop;
    window.scrollTo({ top: elFromTop, behavior: "smooth" });
  }
}
</script>
