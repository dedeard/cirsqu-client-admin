<template>
  <div>
    <form-upload-episode :lid="lesson.id" @created="onEpisodeCreated" />
    <draggable v-model="lesson.episodes" @change="updateIndex">
      <transition-group>
        <element-episode-list
          v-for="episode in lesson.episodes"
          :key="episode.id"
          :lid="lesson.id"
          :episode="episode"
          @updated="onEpisodeUpdated"
          @deleted="onEpisodeDeleted"
        />
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { FadeTransition } from 'vue2-transitions'
export default {
  name: 'EditLessonEpisodePage',
  components: {
    draggable,
    FadeTransition,
  },
  async asyncData({ $axios, params }) {
    const id = params.id
    const lesson = await $axios.$get('/admin/lessons/' + id)
    return {
      lesson,
      loading: true,
    }
  },
  methods: {
    onEpisodeCreated(lesson) {
      this.lesson = lesson
    },
    onEpisodeUpdated(lesson) {
      this.lesson = lesson
    },
    onEpisodeDeleted(lesson) {
      this.lesson = lesson
    },
    async updateIndex() {
      try {
        const index = this.lesson.episodes.map(({ id }) => id)
        this.lesson = await this.$axios.$put('/admin/episodes/' + this.lesson.id + '/index', { index })
      } catch (e) {
        this.$swal({
          icon: 'error',
          text: this.$errorMessage(e),
        })
      }
    },
  },
}
</script>
