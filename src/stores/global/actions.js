import LZString from 'lz-string'
import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || ''

import prideLogo from '@/assets/images/LSEMS_Pride.png'
import breastCancerLogo from '@/assets/images/LSEMS_BCA.png'
import halloweenLogo from '@/assets/images/LSEMS_Halloween.png'
import thanksgivingLogo from '@/assets/images/LSEMS_Fall.png'
import christmasLogo from '@/assets/images/LSEMS_Christmas.png'

export default {
    setLogo(logo) {
        this.siteLogo = logo
    },
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
    /**
     * Update logo based on the current date/month
     */
    updateLogoBySeason() {
        const now = new Date()
        const month = now.getMonth() + 1 // JS months are 0-based (0–11)
        const day = now.getDate()

        // 🏳️‍🌈 Pride Month (June)
        if (month === 6) {
            this.siteLogo = prideLogo

            // 🎃 Halloween or 🎗 Breast Cancer Awareness (October)
        } else if (month === 10) {
            // Option 1: specific ranges within October
            if (day >= 1 && day <= 24) {
                this.siteLogo = breastCancerLogo // early October
            } else if (day >= 23 && day <= 31) {
                this.siteLogo = halloweenLogo // mid–late October
            } else {
                this.siteLogo = halloweenLogo
            }

            // 🦃 Thanksgiving (November)
        } else if (month === 11) {
            this.siteLogo = thanksgivingLogo

            // 🎄 Christmas (December)
        } else if (month === 12) {
            this.siteLogo = christmasLogo

            // 🩺 Default logo for all other months
        }
    },
}
