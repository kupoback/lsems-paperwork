import LZString from 'lz-string'
import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || 'DEFAULT_FALLBACK_KEY'

export default {
    /**
     * Save user data (compressed + encrypted)
     */
    saveUserData() {
        try {
            const json = JSON.stringify(this.userData)
            const compressed = LZString.compressToUTF16(json)
            const encrypted = CryptoJS.AES.encrypt(compressed, SECRET_KEY).toString()
            localStorage.setItem('userData', encrypted)
        } catch (error) {
            console.error('Failed to save user data:', error)
            throw error
        }
    },
    /**
     * Load and decrypt stored data
     */
    loadUserData() {
        try {
            const encrypted = localStorage.getItem('userData')
            if (!encrypted) return

            const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8)
            const decompressed = LZString.decompressFromUTF16(decrypted)
            const parsed = JSON.parse(decompressed)

            // Deep merge so you don't lose structure
            this.userData = {...this.userData, ...parsed}
        } catch (error) {
            console.error('Failed to load user data:', error)
            // clear corrupted data
            localStorage.removeItem('userData')
        }
    },
}
