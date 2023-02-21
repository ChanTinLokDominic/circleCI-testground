export function validatePassword(password) {
    if (4 <= password.length && password.length <= 20) {
        return true
    }
    return false
}