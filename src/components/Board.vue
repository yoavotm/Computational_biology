<template>
<!-- board of width * height cells -->
<table>
    <tbody>
      <tr v-for="i in height" :key="i">
        <td v-for="j in width" :key="j" :style="{ backgroundColor: currentBoard[i][j] }"></td>
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
            distrabutionValue: [0.25 , 0.25 , 0.25 , 0.25],
            currentBoard: [],
        }
    },
}


</script>