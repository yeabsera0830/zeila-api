export default types = {
    SUCCESS: 0,
    FAILURE: 1,
    SIGNUP_WITH_FB: 'SIGNUP_WITH_FB',
    SIGNUP: 'SIGNUP',
    LOGIN_WITH_FB: 'LOGIN_WITH_FB',
    LOGIN: 'LOGIN'
}

import * as axios from "axios"
const FormData = require('form-data')
import { getAccessTokenFromDevice } from "../../../../core/useCases/auth"
import links from "../../../../core/values/links"
const appSecret = require('../../../../../app.json').app.appSecret

export const submitData = async (placeProfile) => {
    const accessToken = await getAccessTokenFromDevice()
    var formData = new FormData()
    formData.append('name', placeProfile['name'])
    formData.append('appSecret', appSecret)
    formData.append('accessToken', accessToken)
    formData.append('profilePicture', { name: 'profile.jpg', type: 'image/jpeg', uri: placeProfile['profilePicture'] })
    formData.append('category', placeProfile['category'])
    formData.append('description', placeProfile['description'])
    formData.append('location', placeProfile['location'])
    formData.append('priceRange', placeProfile['priceRange'])
    formData.append('workingDays', placeProfile['workingDays'])
    formData.append('workHours', placeProfile['workHours'])
    formData.append('owner', placeProfile['owner'])
    placeProfile['photos'].forEach(photo => {
        formData.append('photo', { name: 'photo.jpg', type: 'image/jpeg', uri: photo })
    })
    return axios.post(links.addPlace, formData)
    .then(res => {
        return {
            status: res.data.status
        }
    })
    .catch(err => {
        console.log(err)
        return {
            status: 400,
            message: "Upload Failed"
        }
    })
}