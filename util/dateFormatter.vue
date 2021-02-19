<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import moment from 'moment';

@Component
export default class DateFormatter extends Vue {
  public static DateFormat: string = "DD MMM, YYYY";

  articleDateFormat(date: string) {
    let momentDate = moment(date).format(DateFormatter.DateFormat);
    return momentDate;
  }
}
</script>
