<template>
    <div class="form">
        <div class="line" data-title="Basic Info"></div>
        <div class="inner-grid">
            <div class="myshop-form-group">
                <label>氏名(漢字) <span class="required">*</span></label>
                <input type="text"
                    id="focusStart"
                    v-model="form.name01" 
                    :class="{error: error.name01.message}"
                    @input="handleInput('name01')" />
                <span class="error-msg" v-if="error.name01.message">
                    {{ error.name01.message }}
                </span>
            </div>
            <div class="myshop-form-group">
                <label>氏名(漢字) <span class="required">*</span></label>
                <input type="text"
                    v-model="form.name02" 
                    :class="{error: error.name02.message}"
                    @input="handleInput('name02')" />
                <span class="error-msg" v-if="error.name02.message">
                    {{ error.name02.message }}
                </span>
            </div>
        </div>
        <div class="inner-grid">
            <div class="myshop-form-group">
                <label>氏名(カナ) <span class="required">*</span></label>
                <input type="text"
                    v-model="form.kana01" 
                    :class="{error: error.kana01.message}" 
                    @input="handleInput('kana01')"/>
                <span class="error-msg" v-if="error.kana01.message">
                    {{ error.kana01.message }}
                </span>
            </div>
            <div class="myshop-form-group">
                <label>氏名(カナ) <span class="required">*</span></label>
                <input type="text"
                    v-model="form.kana02" 
                    :class="{error: error.kana02.message}" 
                    @input="handleInput('kana02')"/>
                <span class="error-msg" v-if="error.kana02.message">
                    {{ error.kana02.message }}
                </span>
            </div>
        </div>
        <div class="myshop-form-group--choose">
            <div class="float-label">性別 <span class="required">*</span></div>
            <div class="radio-group">
                <label>
                    <input type="radio" name="gender" value="1" v-model="form.sex" @input="handleInput('sex')" />男
                </label>
                <label>
                    <input type="radio" name="gender" value="2" v-model="form.sex" @input="handleInput('sex')" />女
                </label>
            </div>
            <span class="error-msg" v-if="error.sex.message">
                {{ error.sex.message }}
            </span>
        </div>
        <div class="myshop-form-group">
            <label>生年月日 <span class="required">*</span></label>
            <input type="date" placeholder="" 
                v-model="form.birth" 
                :class="{error: error.birth.message}"
                @input="handleInput('birth')" />
            <span class="error-msg" v-if="error.birth.message">
                {{ error.birth.message }}
            </span>
        </div>
        <div class="line" data-title="Personal Info"></div>
        <div class="myshop-form-group">
            <label>電話番号 <span class="required">*</span></label>
            <input type="tel" placeholder="" 
                v-model="form.phone_number" 
                :class="{error: error.phone_number.message}"
                @input="handleInput('phone_number')"  />
            <span class="error-msg" v-if="error.phone_number.message">
                {{ error.phone_number.message }}
            </span>
        </div>
        <div class="myshop-form-group">
            <label>E-mail</label>
            <input type="text" placeholder="" 
                v-model="form.email" 
                :class="{error: error.email.message}"
                @input="handleInput('email')" />
            <span class="error-msg" v-if="error.email.message">
                {{ error.email.message }}
            </span>
        </div>
        <div class="line" data-title="Other Info"></div>
        <div class="myshop-form-group myshop-form-group--select">
            <label>顧客ランク</label>
            <select v-model="form.customer_rank">
                <option 
                    v-for="item in formData.customer_ranks" 
                    :key="item.id" 
                    :value="item.id"
                >
                    {{ item.name }}
                </option>
            </select>
            <span class="error-msg" v-if="error.customer_rank.message">
                {{ error.customer_rank.message }}
            </span>
        </div>
        <div class="myshop-form-group myshop-form-group--select">
            <label>来店動機</label>
            <select v-model="form.visit_reason">
                <option 
                    v-for="item in formData.visit_reasons" 
                    :key="item.id" 
                    :value="item.id"
                >
                    {{ item.name }}
                </option>
            </select>
            <span class="error-msg" v-if="error.visit_reason.message">
                {{ error.visit_reason.message }}
            </span>
        </div>
        <div class="myshop-form-group myshop-form-group--select">
            <label>来店動機イベント</label>
            <select v-model="form.visit_event">
                <option 
                    v-for="item in formData.visit_events" 
                    :key="item.id" 
                    :value="item.id"
                >
                    {{ item.name }}
                </option>
            </select>
            <span class="error-msg" v-if="error.visit_event.message">
                {{ error.visit_event.message }}
            </span>
        </div>
        <div class="myshop-form-group myshop-form-group--select">
            <label>職業</label>
            <select v-model="form.job">
                <option 
                    v-for="item in formData.jobs" 
                    :key="item.id" 
                    :value="item.id"
                >
                    {{ item.name }}
                </option>
            </select>
            <span class="error-msg" v-if="error.job.message">
                {{ error.job.message }}
            </span>
        </div>
        <div class="myshop-form-group">
            <label>勤務先名</label>
            <input type="text" placeholder="" 
                v-model="form.office_name" 
                :class="{error: error.office_name.message}" />
            <span class="error-msg" v-if="error.office_name.message">
                {{ error.office_name.message }}
            </span>
        </div>
    </div>
</template>

<script>
import { useCustomerRegisterForm } from '@/store/customer-register'

export default {
    name: 'RegisterForm',
    setup() {
        return useCustomerRegisterForm()
    }
}
</script>

<style scoped>
.form {
    max-width: 680px;
    margin: 0 auto;
    padding: var(--space-6) var(--space-5);
    padding-top: calc(var(--space-5) * 3);
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
    margin-top: var(--space-5);
}
.line::before {
    content: attr(data-title);
    font-size: .6rem;
    font-weight: 800;
    color: rgba(255,255,255,.7);
    background-color: var(--primary);
    padding: 0 var(--space-0);
    position: absolute;
    top: 50%;
    left: var(--space-3);
    transform: translateY(-60%);
}
</style>