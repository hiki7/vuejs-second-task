<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  channel: { type: String, required: true },
  views: { type: Number, required: true },
  thumbnail: { type: String, required: true }
})

const emit = defineEmits(['liked'])
const liked = ref(false)

function sendLike() {
  if (liked.value) return
  liked.value = true
  emit('liked')
}

function formatViews(n) {
  if (n >= 1_000_000) return (n/1_000_000).toFixed(1).replace(/\.0$/,'') + 'M views'
  if (n >= 1_000) return (n/1_000).toFixed(1).replace(/\.0$/,'') + 'K views'
  return `${n} views`
}
</script>

<template>
  <article class="card">
    <img class="thumb" :src="thumbnail" :alt="title" loading="lazy" />
    <div class="info">
      <h3 class="title" :title="title">{{ title }}</h3>
      <p class="sub">
        <span class="ch">{{ channel }}</span> • <span class="vw">{{ formatViews(views) }}</span>
      </p>
      <button class="likeBtn" @click="sendLike" :aria-pressed="liked">
        <span v-if="!liked">Like ♥</span>
        <span v-else>Liked ✓</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #181818;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
  transition: transform .12s ease, border-color .12s;
}
.card:hover { transform: translateY(-2px); border-color: #3a3a3a; }
.thumb { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }
.info { padding: 12px; }
.title { font-size: 16px; line-height: 1.35; margin: 0 0 6px; color: #fff; }
.sub { margin: 0 0 10px; font-size: 13px; color: #c8c8c8; }
.ch { color: #ddd; }
.vw { color: #aaa; }
.likeBtn {
  padding: 8px 10px;
  font: inherit;
  border-radius: 8px;
  border: 1px solid #444;
  background: #202020;
  color: #eaeaea;
  cursor: pointer;
}
.likeBtn:hover { background: #2a2a2a; }
.likeBtn[aria-pressed="true"] {
  border-color: #666;
  background: #2b2b2b;
  cursor: default;
}
</style>
