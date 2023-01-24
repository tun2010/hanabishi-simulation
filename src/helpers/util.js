
export function simuLoading(time = 1000) {
    return new Promise((resolve) => {
        const tiemout = setTimeout(() => {
            clearTimeout(tiemout)
            resolve()
        }, time)
    })
}

export function generateMessage(msg, param = []) {
    let showMessage = msg;
    for(let [index, text] of param.entries()) {
        showMessage = showMessage.replace(`{${index}}`, text)
    }
    return showMessage
}

export function concatZero(value, len = 8) {
    const strValue = String(value)
    const strLen = strValue.length
    if (strLen >= len) return value
    const neededZeros = len - strLen
    let str = ''
    for(let i = 0; i < neededZeros; i++) {
        str = str.concat('0')
    }
    return str.concat(strValue)
}

export function formatDate(datetime, options = { year: 'numeric', month: 'numeric', day: 'numeric' }) {
    if (!datetime) return ''
    try {
        const formatted = new Date(datetime).toLocaleString('ja-JP', options)
        return formatted
    } catch(err) {
        return 'Not date format'
    }
}

export function formatCurrency(number) {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number)
}

export function getAge(dateString) {
    const today = new Date()
    const birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

export function triggerEvent(elem, eventName) {
    const note = elem instanceof Element ? elem : document.getElementById(elem)
    const event = new Event(eventName)
    note.dispatchEvent(event)
}

export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0
}
