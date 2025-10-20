import { ref, computed, watch, onMounted } from 'vue'

export function useVideos () {
  const videos = ref([])
  const loading = ref(true)
  const searchQuery = ref('')
  const totalLikes = ref(0)

  // Computed: filter by title or channel (case-insensitive)
  const filteredVideos = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return videos.value
    return videos.value.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q)
    )
  })

  // Watcher: track changes in searchQuery
  watch(searchQuery, (nv, ov) => {
    // could be analytics/logging; for assignment we log
    console.log('[watch] searchQuery changed:', ov, '=>', nv)
  })

  // Like logic in composable (as required)
  function handleLiked () {
    totalLikes.value++
  }

  // Simulate fetch with setTimeout and mock data
  onMounted(() => {
    setTimeout(() => {
      videos.value = [
        {
          title: 'Vue 3 Composition API Crash Course',
          channel: 'CodeAcademy Plus',
          views: 1250345,
          thumbnail: 'https://picsum.photos/seed/vue3/480/270'
        },
        {
          title: 'Building a YouTube Clone UI',
          channel: 'Frontend Craft',
          views: 482201,
          thumbnail: 'https://picsum.photos/seed/youtubeui/480/270'
        },
        {
          title: 'JavaScript Async/Await in 10 Minutes',
          channel: 'JS Nuggets',
          views: 902344,
          thumbnail: 'https://picsum.photos/seed/async/480/270'
        },
        {
          title: 'State Management in Vue: Pinia vs Vuex',
          channel: 'The Vue Way',
          views: 31127,
          thumbnail: 'https://picsum.photos/seed/pinia/480/270'
        },
        {
          title: 'Responsive CSS Grid Layout Tutorial',
          channel: 'CSS Mastery',
          views: 1570084,
          thumbnail: 'https://picsum.photos/seed/cssgrid/480/270'
        },
        {
          title: 'Deploying Vite + Vue to Netlify',
          channel: 'DevOps Lite',
          views: 88712,
          thumbnail: 'https://picsum.photos/seed/deploy/480/270'
        }
      ]
      loading.value = false
    }, 700)
  })

  return {
    videos,
    filteredVideos,
    searchQuery,
    totalLikes,
    loading,
    handleLiked
  }
}
