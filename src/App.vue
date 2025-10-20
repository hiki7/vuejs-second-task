<script setup>
import { computed } from 'vue'
import VideoCard from './components/VideoCard.vue'
import { useVideos } from './composables/useVideos'

const { filteredVideos, searchQuery, totalLikes, loading, handleLiked } = useVideos()

// Reactive counter via computed (optional helper)
const foundCount = computed(() => filteredVideos.value.length)
</script>

<template>
  <div class="container">
    <header class="header">
      <input
        class="search"
        type="search"
        placeholder="Search by title or channel…"
        v-model="searchQuery" />
      <div class="meta">
        Found: <strong>{{ foundCount }}</strong>
      </div>
    </header>

    <div class="totalLikes">Total likes: {{ totalLikes }}</div>

    <div v-if="loading" class="loading">Loading videos…</div>

    <p v-if="!loading && foundCount === 0" class="empty">No videos found.</p>

    <section v-else class="grid">
      <!-- v-for + v-bind + event emission -->
      <VideoCard
        v-for="v in filteredVideos"
        :key="v.title + '|' + v.channel"
        :title="v.title"
        :channel="v.channel"
        :views="v.views"
        :thumbnail="v.thumbnail"
        @liked="handleLiked" />
    </section>
  </div>
</template>
