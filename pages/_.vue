<script lang="ts">

import { Component } from "nuxt-property-decorator";
import Brands from "@/pages/brands/index.vue";
declare var _: any;

@Component
export default class BrandSpecificPage extends Brands {

    created() {
      let queryName: string = this.$route.params.pathMatch;
      queryName = queryName.replace(/-/g, ' ');
      queryName = _.startCase(queryName).replace(/art/i, 'ART');
      this.$route.query.name = queryName;
    }
}
</script>