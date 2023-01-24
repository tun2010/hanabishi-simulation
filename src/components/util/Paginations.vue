<template>
    <section class="paginations">
        <Pagination
            v-model="page"
            :pages="total"
            :range-size="1"
            activeColor="var(--secondary)"
            @update:modelValue="updateHandler"
            :hideFirstButton="true"
            :hideLastButton="true"
        />
    </section>
</template>

<script>
import Pagination from "@hennge/vue3-pagination"

export default {
    name: 'Paginations',
    components: {
        Pagination,
    },
    props: {
        page: Number,
        total: Number,
    },
    setup() {
        function updateHandler(page) {
            console.log(page)
        }
        return {
            updateHandler,
        }
    }
}
</script>

<style scoped>
.paginations {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.Pagination {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: var(--space-1);
}
</style>