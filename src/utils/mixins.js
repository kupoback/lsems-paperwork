import {toNumber} from 'lodash'
import convert from 'convert'
import {parseInt} from 'lodash/string'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

/**
 * Converts the temperature to Celsius if set in F
 *
 * @param temperature
 * @returns {*|string}
 */
export const formatTemperature = temperature => {
    if (temperature >= 50) {
        return convert(temperature, 'F').to('C').toFixed(1)
    }
    return temperature
}

/**
 * Converts a height value to cm if it's Imperial units
 *
 * @param {String} height The height value
 * @returns {string}
 */
export const convertHeightToCm = height => {
    const regx = /^(\d+)'(\d+)(?:''|")$/
    const match = regx.exec(height)
    if (match) {
        const inches = parseInt(match[1], 10) * 12 + parseInt(match[2], 10)
        return convert(inches, 'inches').to('cm').toFixed(0)
    }

    return toNumber(height).toFixed(0)
}

/**
 * Converts the weight into kg if it's in Imperial units
 * @param {String} weight The weight value
 * @returns {*|string}
 */
export const convertWeightToKg = weight => {
    const regx = /^(\d+)?\s(lbs?|pounds?)$/
    const match = regx.exec(weight)
    if (match && match[2] !== 'kg') {
        return convert(parseInt(match[1], 10), 'pounds').to('kg').toFixed(0)
    }

    return weight
}

/**
 * Calculates the BMI for a patient ignoring age
 * @param {Number} height The patients height in cm
 * @param {Number} weight The patients weight in kg
 * @returns {*}
 */
export const calculateBmi = (height, weight) => {
    return (weight / ((height * height) / 10000)).toFixed(2)
}

/**
 * Converts the date to UTC
 *
 * @param {string} date The date
 * @returns
 */
export const dateToUtc = date => dayjs.utc(date).format('DD/MMM/YYYY').toUpperCase()

/**
 * Converts the date and time to UTC
 *
 * @param {string} date The date
 * @returns
 */
export const dateTimeToUtc = date => dayjs.utc(date).format('DD/MMM/YYYY HH:mm').toUpperCase()

/**
 * Converts the time to UTC
 *
 * @param {string} time The time
 * @returns
 */
export const timeToUtc = time => dayjs.utc(time, 'HH:mm').format('HH:mm').toUpperCase()
