import { useRoute } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'

export default function useScroll(id, top, update) {
    const route = useRoute()

    onMounted(async () => {
        if (route.query.scroll && top.value) {
            const scrollEl = document.querySelector('#' + id)
            scrollEl.scrollTo(0, top.value)
        }
    })

    onBeforeUnmount(() => {
        const scrollEl = document.querySelector('#' + id)
        update(scrollEl?.scrollTop || 0)
    })

}