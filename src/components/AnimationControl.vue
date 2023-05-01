<template>
    <div style="margin-bottom: 20px;">
      current iteration: {{ itrationProp }}
      <div>
        <span>
          <button @click="slowAnimationProp" :disabled="waitingTime === MAX_WAITING_TIME" >
            <i class="fas fa-backward"></i>
          </button>
        </span>
        <span>
          <button @click="startAnimationProp" v-if="!isBoardRunningProp" :disabled="itrationProp === iterations">
            <i class="fas fa-play"></i>
          </button>
  
          <button @click="stopAnimationProp" v-else>
            <i class="fas fa-stop"></i>
          </button>
        </span>
        <span>
          <button @click="speedAnimationProp" :disabled="waitingTime === MIN_WAITING_TIME">
            <i class="fas fa-fast-forward"></i>
          </button>
        </span>
      </div>
    </div>
  </template>
  
  <script>
import { mapState } from 'vuex';
import {ANIMATION_SPEED_DELTA, MAX_WAITING_TIME, MIN_WAITING_TIME} from '../store/consts.js'

  export default {
    props: {
      startAnimationProp: {
        type: Function,
        required: true
      },
      stopAnimationProp: {
        type: Function,
        required: true
      },
      slowAnimationProp: {
        type: Function,
        required: true
      },
      speedAnimationProp: {
        type: Function,
        required: true
      },
      isBoardRunningProp: {
        type: Boolean,
        required: true
      },
      itrationProp: {
        type: Number,
        required: true
      },
      waitingTime: {
        type: Number,
        required: true
      }
    },
    data() {
        return {
            ANIMATION_SPEED_DELTA,
            MAX_WAITING_TIME,
            MIN_WAITING_TIME
        }
    },
    computed :{
        ...mapState(['iterations'])
    }
  }
  </script>
  