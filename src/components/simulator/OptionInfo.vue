<template>
    <div class="option-choose">
        <div class="option-choose__body">
            <div class="option__img"></div>
            <div class="option__description">
                <h4>{{item.info.name}}</h4>
                <p>現代風にも対応できるデザインや</p>
            </div>
        </div>
        <div class="option-choose__footer">
            <button type="button" @click="onCancel" class="myshop-btn myshop-btn--outline">戻る</button>
            <button type="button" @click="onSelect" class="myshop-btn myshop-btn--primary">確認</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OptionChooseTemplate',
    props: {
        item: Object,
    },
    setup(props, context) {
        function onSelect() {
            context.emit('select', props.item)
        }
        function onCancel() {
            context.emit('close')
        }

        return {
            onSelect,
            onCancel
        }
    }
}
</script>

<style scoped>
.option-choose {
    position: absolute;
    z-index: 5;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: var(--primary);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) 130px;
}
.option-choose__body {
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
}
.option__img {
    width: 100%;
    height: 0;
    padding-top: 65%;
    background-color: var(--primary-lighter);
}
.option__description {
    color: rgba(255,255,255,.8);
    font-size: .9rem;
    padding: var(--space-2);
    text-align: left;
}
.option__description h4 {
    margin: 0;
    font-size: 1.2rem;
}
.option__description p {
    margin: var(--space-1) 0 0;
    display: block;
    font-size: .85rem;
}
.option-choose__footer {
    border-top: 1px solid var(--border-color);
    padding: var(--space-4);
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: var(--space-4);
}
</style>