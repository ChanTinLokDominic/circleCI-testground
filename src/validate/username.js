export function validateUsername(username) {
    if ( 4<= username.length && username.length <= 20 ) {
        return true
    }
    return false
}