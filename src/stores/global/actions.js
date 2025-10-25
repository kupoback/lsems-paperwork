import LZString from 'lz-string'
import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || ''

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

            this.userData = {...this.userData, ...parsed}
        } catch (error) {
            console.error('Failed to load user data:', error)
            localStorage.removeItem('userData')
        }
    },

    /**
     * Toggle dark mode and persist preference
     */
    toggleDarkMode() {
        this.darkMode = !this.darkMode
        localStorage.setItem('darkMode', JSON.stringify(this.darkMode))
        document.body.classList.toggle('dark', this.darkMode)
    },

    /**
     * Load saved theme on startup
     */
    loadThemePreference() {
        const stored = localStorage.getItem('darkMode')
        this.darkMode = stored ? JSON.parse(stored) : window.matchMedia('(prefers-color-scheme: dark)').matches
        document.body.classList.toggle('dark', this.darkMode)
    },
}
