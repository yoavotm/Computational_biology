<template>
<!-- board of width * height cells -->
<table>
    <tbody>
      <tr v-for="i in 100" :key="i">
        <td v-for="j in 100" :key="j" :style="{ backgroundColor: cellColors[i][j] }"></td>
      </tr>
    </tbody>
  </table>

</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex"


export default {
    components: { },
    computed: { 
        ...mapState(['height', 'width', 'distrabution', 'p', 'boards'])
     },
    data() {
        return {
            pValue: 1,
            distrabution: [0.25 , 0.25 , 0.25 , 0.25],
            currentBoard: [],
        }
    },
}


</script>