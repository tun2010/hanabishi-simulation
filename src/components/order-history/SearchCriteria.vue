<template>
    <div class="search-criteria">
        <form @submit.prevent="sumitSearch">
            <layout-scroll-view scroll="y">
                <div class="loading-continaer" v-if="busy">
                    <inline-loading />
                </div>
                <div class="form" v-else>
                    <!-- <div class="line" data-title="Basic Info"></div> -->
                    <div class="myshop-form-group">
                        <label>お客様名</label>
                        <input type="text" placeholder="" 
                            v-model="form.customer_name" 
                            :class="{error: error.customer_name.message}"
                            @input="handleInput('customer_name')" />
                        <span class="error-msg" v-if="error.customer_name.message">
                            {{ error.customer_name.message }}
                        </span>
                    </div>
                    <div class="myshop-form-group">
                        <label>担当者社員番号</label>
                        <input type="text" placeholder="" 
                            v-model="form.employee_number" 
                            :class="{error: error.employee_number.message}"
                            @input="handleInput('employee_number')" />
                        <span class="error-msg" v-if="error.employee_number.message">
                            {{ error.employee_number.message }}
                        </span>
                    </div>
                    <!-- <div class="line" data-title="スタイル"></div> -->
                    <div class="myshop-form-group myshop-form-group--select">
                        <label>カテゴリ</label>
                        <select v-model="form.category" @change="handleInput('category')">
                            <option 
                                v-for="item in formData.categories" 
                                :key="item.id" 
                                :value="item.id"
                            >
                                {{ item.name }}
                            </option>
                        </select>
                        <span class="error-msg" v-if="error.category.message">
                            {{ error.category.message }}
                        </span>
                    </div>
                    <div class="myshop-form-group myshop-form-group--select">
                        <label>スタイル</label>
                        <select v-model="form.model" :disabled="!models" @change="handleInput('model')">
                            <option 
                                v-for="item in models" 
                                :key="item.id" 
                                :value="item.id"
                            >
                                {{ item.name }}
                            </option>
                        </select>
                        <span class="error-msg" v-if="error.model.message">
                            {{ error.model.message }}
                        </span>
                    </div>
                    <!-- <div class="line" data-title="受注日"></div> -->
                    <div class="myshop-form-group">
                        <label>受注日(始める)</label>
                        <input type="date"
                            id="focusStart"
                            v-model="form.order_date_start" 
                            :class="{error: error.order_date_start.message}"
                            @input="handleInput('order_date_start')" />
                        <span class="error-msg" v-if="error.order_date_start.message">
                            {{ error.order_date_start.message }}
                        </span>
                    </div>
                    <div class="myshop-form-group">
                        <label>受注日(終わり)</label>
                        <input type="date"
                            v-model="form.order_date_end" 
                            :class="{error: error.order_date_end.message}"
                            @input="handleInput('order_date_end')" />
                        <span class="error-msg" v-if="error.order_date_end.message">
                            {{ error.order_date_end.message }}
                        </span>
                    </div>
                    <!-- <div class="line" data-title="店舗到着日"></div> -->
                    <div class="myshop-form-group">
                        <label>店舗到着日(始める)</label>
                        <input type="date"
                            id="focusStart"
                            v-model="form.arrival_date_start" 
                            :class="{error: error.arrival_date_start.message}"
                            @input="handleInput('arrival_date_start')" />
                        <span class="error-msg" v-if="error.arrival_date_start.message">
                            {{ error.arrival_date_start.message }}
                        </span>
                    </div>
                    <div class="myshop-form-group">
                        <label>店舗到着日(終わり)</label>
                        <input type="date"
                            v-model="form.arrival_date_end" 
                            :class="{error: error.arrival_date_end.message}"
                            @input="handleInput('order_date_end')" />
                        <span class="error-msg" v-if="error.arrival_date_end.message">
                            {{ error.arrival_date_end.message }}
                        </span>
                    </div>
                    <div class="myshop-form-group myshop-form-group--select">
                        <label>ステータス</label>
                        <select v-model="form.status" @change="handleInput('status')">
                            <option 
                                v-for="item in formData.status" 
                                :key="item.id" 
                                :value="item.id"
                            >
                                {{ item.name }}
                            </option>
                        </select>
                        <span class="error-msg" v-if="error.status.message">
                            {{ error.status.message }}
                        </span>
                    </div>
                    <div />
                    <!-- <div class="line" data-title="受注店舗"></div> -->
                    <div class="myshop-form-group myshop-form-group--select">
                        <label>エリアを選択</label>
                        <select v-model="form.area" @change="handleInput('area')">
                            <option 
                                v-for="item in formData.areas" 
                                :key="item.id" 
                                :value="item.id"
                            >
                                {{ item.name }}
                            </option>
                        </select>
                        <span class="error-msg" v-if="error.area.message">
                            {{ error.area.message }}
                        </span>
                    </div>
                    <div class="myshop-form-group myshop-form-group--select">
                        <label>店舗を選択</label>
                        <select v-model="form.store" :disabled="!stores" @change="handleInput('store')">
                            <option 
                                v-for="item in stores" 
                                :key="item.id" 
                                :value="item.id"
                            >
                                {{ item.name }}
                            </option>
                        </select>
                        <span class="error-msg" v-if="error.store.message">
                            {{ error.store.message }}
                        </span>
                    </div>
                </div>
            </layout-scroll-view>
            <layout-footer theme="align-center">
                <button type="button" @click="closeCriteria" class="myshop-btn myshop-btn--outline">すべてクリア</button>
                <button type="sumit" class="myshop-btn myshop-btn--secondary">検索</button>
            </layout-footer>
        </form>
    </div>
</template>

<script>
import { useSearchCriteria } from '@/store/history'

import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import LayoutFooter from '@/layouts/LayoutFooter.vue'
import InlineLoading from '../util/InlineLoading.vue'
export default {
    name: 'SearchCriteria',
    components: { 
        LayoutScrollView,
        LayoutFooter,
        InlineLoading,
    },
    setup(props, content) {
        return useSearchCriteria()
    }
}
</script>

<style scoped>
.search-criteria {
    width: 100%;
    position: absolute;
    z-index: 6;
    top: 0; bottom: 0;
    left: 0; right: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    --max-width: 800px;
    /* background-image: radial-gradient(transparent 2px, var(--bg-gray) 2px);
    background-size: 4px 4px;
    backdrop-filter: blur(3px); */
}   
form {
    width: 100%;
    max-width: var(--max-width);
    background-color: var(--bg-gray);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) 90px;
    max-height: 100%;
    margin: 0;
    border: 1px solid var(--border-color);
}
.loading-continaer {
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form {
    padding: calc(var(--space-6) * 1.8) var(--space-4);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5) var(--space-4);
}
.inner-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2);
}
.full-grid {
    grid-column: 1 / span 2;
}
.line {
    grid-column: 1 / span 2;
    border-top: 1px solid var(--border-color);
    position: relative;
    margin-top: var(--space-4);
}
.line::before {
    content: attr(data-title);
    font-size: .6rem;
    font-weight: 800;
    color: rgba(255,255,255,.7);
    background-color: var(--bg-gray);
    padding: 0 var(--space-0);
    position: absolute;
    top: 50%;
    left: var(--space-3);
    transform: translateY(-60%);
}
</style>