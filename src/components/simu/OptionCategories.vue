<template>
    <ul class="option-categories">
        <li class="option-categories__item" v-for="item in list" :key="item.id">
            <button class="option-categories__btn" @click="selectOption(item)" :class="{active: current == item.id}">
                <span class="option--name">{{ item.option_category_name }}</span>
                <span class="option--value">{{ item.value }}</span>
                <span class="option--deco"></span>
                <span class="option--arrow"></span>
            </button>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'OptionCategories',
    props: {
        current: Number | String | null,
        list: Array,
    },
    setup(props, context) {
        function selectOption(item) {
            context.emit('select', item)
        }

        return {
            selectOption,
        }
    }
}
</script>

<style scoped>
.option-categories {
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: var(--space-4);
    gap: var(--simu-gap);
}
/* .option-categories__item {
    background-color: var(--primary-light);
    padding: var(--space-1);
} */
.option-categories__btn {
    width: 100%;
    min-height: 60px;
    display: grid;
    grid-template-columns: 160px 1fr 1px 42px;
    align-items: center;
    text-align: left;
    color: rgba(255,255,255,1);
    gap: var(--space-4);
    font-size: .9rem;
    transform: translateX(0);
    transition: all .3s ease;
    background-color: var(--primary-light);
    padding: 0;
}
.option-categories__btn.active {
    transform: translateX(-100px);
    transition: all .2s ease .2s;
}
.option-categories__btn.disabled {
    pointer-events: none;
}
.option--deco {
    width: 0;
    height: 60%;
    border-right: 1px solid var(--simu-bg);
}
.option--name {
    color: var(--gray-200);
    padding-left: var(--space-4);
}
.option--value {
    color: var(--secondary);
    font-weight: 600;
    text-transform: uppercase;
}

.option--arrow {
    width: 24px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.option--arrow::before,
.option--arrow::after {
    content: '';
    display: block;
    width: 0;
    height: 20px;
    border-left: 1px solid rgb(40,40,40);
    transition: all .3s ease;
}
.option--arrow::before {
    transform-origin: bottom right;
    transform: rotate(-45deg);
}
.option--arrow::after {
    transform-origin: top right;
    transform: rotate(45deg);
}

.option-categories__btn.disabled .option--deco,
.option-categories__btn.disabled .option--arrow {
    opacity: 0;
}
</style>