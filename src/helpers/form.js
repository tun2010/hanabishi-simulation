
export function isError(errorObj) {
    let error = false
    Object.values(errorObj).forEach(err => {
        if (err) error = true
    })
    return error
}

export function checkError(formObj, errorObj) {
    let isError = false
    Object.keys(formObj).forEach(key => {
        let args = []
        if (errorObj[key].args) args = errorObj[key].args.map(key => formObj[key])
        if (errorObj[key].checkError(formObj[key], ...args)) {
            isError = true
        }
    })
    return isError
}

export function getErrorMesssage(value, errorObj) {
    return errorObj.checkError(value)
}

export function getErrorMessages(formObj, errorObj) {
    let errorMessages = []
    Object.keys(formObj).forEach(key => {
        let args = []
        if (errorObj[key].args) args = errorObj[key].args.map(key => formObj[key])
        const errorMessage = errorObj[key].checkError(formObj[key], ...args)
        errorObj[key].message = errorMessage
        if (errorMessage) {
            errorMessages.push(errorMessage)
        }
    })
    return errorMessages
}

export function focusErrorInput() {
    const form = document.querySelector('form')
    if (form) {
        const node = form.querySelector('input.error')
        if (node) node.focus()
        return true
    }
    return false
}