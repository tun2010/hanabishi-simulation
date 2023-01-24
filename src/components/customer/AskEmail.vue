<template>
    <layout-slide-in>
        <layout-header>
            <template #small>メールアドレスが登録されていないお客様</template>
            <template #title>メールアドレス登録</template>
        </layout-header>
        <layout-scroll-view scroll="y">
            <form class="ask-email">
                <div class="myshop-form-group">
                    <label>電子メールアドレス <span class="required">*</span></label>
                    <input type="email" placeholder=""
                        id="email-input" 
                        v-model="userEmail.email" 
                        required 
                        @blur="handleBlur"
                        :readonly="isAskingCode"
                        :class="{error: isEmailError}" />
                    <span class="error-msg">{{isEmailError}}</span>
                </div>
                <div class="myshop-form-group">
                    <label>確認コード <span class="required">*</span></label>
                    <input type="text" placeholder="" 
                        id="code-input" 
                        v-model="userEmail.confirm_code" 
                        required maxlength="6"
                        :readonly="!isAskingCode"
                        :class="{error: isCodeError}"
                        @input="handleCodeChange($event)" />
                    <span class="error-msg">{{isCodeError}}</span>
                </div>
                <p class="ask-email__alert">
                    {{message}}
                </p>
                <div class="form-footer">
                    <button type="button" 
                        v-if="isAskingCode" 
                        @click="confirmCode" 
                        class="myshop-btn myshop-btn--primary" 
                        :class="{'myshop-btn--secondary': isEmailButtonValid('confirm_code')}">コード確認</button>
                    <button type="button" 
                        v-else 
                        @click="updateEmail" 
                        class="myshop-btn myshop-btn--primary" 
                        :class="{'myshop-btn--secondary': isEmailButtonValid('email')}">確認</button>
                </div>
            </form>
        </layout-scroll-view>
        <layout-footer>
            <button type="button" @click="resetUserEmail" class="myshop-btn myshop-btn--outline">戻る</button>
            <button type="button" @click="continueWithoutMail" class="myshop-btn myshop-btn--primary">今はしない</button>
        </layout-footer>
    </layout-slide-in>
</template>

<script>
import { ref, watchEffect, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCustomerStore } from '@/store/customer'
import { triggerEvent } from '@/helpers/util'

import LayoutHeader from '@/layouts/LayoutHeader.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import LayoutFooter from '@/layouts/LayoutFooter.vue'
import LayoutSlideIn from '@/layouts/LayoutSlideIn.vue'

export default {
    name: 'AskEmail',
    components: {
        LayoutHeader,
        LayoutScrollView,
        LayoutFooter,
        LayoutSlideIn,
    },
    setup() {
        const mailActive = ref(false)
        const customerStore = useCustomerStore()
        const { activeUserId, userEmail, isEmailValid, isEmailError, isCodeError, isAskingCode, isEmailButtonValid } = storeToRefs(customerStore)
        const { resetUserEmail, confirmCode, updateEmail, continueWithoutMail } = customerStore
        const messages = {
            default: "新戦スケ文触フぐ林叫たえフ嫌見むぴごづ襲式メミ大装後みッてき占産結亜っそゃへ。",
            sumit_email: "調ムア情音りト辞掲づぐ援都ニケ年雑療サトレウ田技ち青非ルヱタ追事ク気失ろ北熱きい明際オケソ。",
            confirm_code_send: '水レ程供ミキ奔1供づで購体死題ソワカ辺階んフい野点ドね千大くイぶ摩張む座別くあらが必盛ラチヌソ版購待岡オ図止題竹認みあめ。',
        }
        const message = ref(messages.default)

        onMounted(() => {
            document.getElementById("email-input").addEventListener('touchstart', focusEmailInput)

            document.getElementById("code-input").addEventListener('touchstart', focusCodeInput)

            return () => {
                document.getElementById("email-input").removeEventListener('touchstart', focusEmailInput)
                document.getElementById("code-input").removeEventListener('touchstart', focusCodeInput)
            }
        }),

        watchEffect(() => {
            if (isAskingCode.value) return message.value = messages.confirm_code_send
            if (!isEmailValid.value) return message.value = messages.sumit_email
            if (activeUserId.value) setTimeout(() => {
                // wait for animation end : 300ms
                triggerEvent("email-input", 'touchstart')
            }, 300)
        })

        function focusEmailInput(event) {
            event.target.focus()
        }

        function focusCodeInput(event) {
            event.target.focus()
        }

        function handleBlur() {
            mailActive.value = true
        }

        function handleCodeChange(event) {
            const value = String(event.target.value)
            if (value.length > 6) {
                const limitedValue = value.slice(0, 6)
                event.target.value = limitedValue
                userEmail.value.confirm_code = limitedValue
            }
        }

        return {
            mailActive,
            message,
            userEmail,
            isEmailError,
            isCodeError,
            isEmailButtonValid,

            isAskingCode,
            handleBlur,
            resetUserEmail,
            confirmCode,
            updateEmail,
            continueWithoutMail,
            handleCodeChange,
        }
    }
}
</script>

<style scoped>
form {
    padding: var(--space-4);
    padding-top: calc(var(--space-5) * 2);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: var(--space-4);
}
.form-footer {
    /* grid-column: 1 / 3; */
    padding: var(--space-2) 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}
.ask-email__alert {
    padding: 0;
    color: rgba(255,255,255,.8);
    font-size: .9rem;
    max-width: 400px;
}
</style>