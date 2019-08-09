import React, { Component } from 'react'
import {
    ScrollView,
    View,
    TextInput,
    Text,
    Image,
    BackHandler,
    TouchableHighlight,
    TouchableOpacity
} from "react-native"
import Header from "./Header"
import styles from "./style"
import { addPlace } from "./strings"
import { ImagePicker } from 'expo'
import ModalImage from "./ModalImage"
import ModalDelete from "./ModalDelete"
import ModalCategory from "./ModalCategory"
import ModalPriceRange from "./ModalPriceRange"
import ModalWorkingDays from "./ModalWorkingDays"
import ModalWorkingHours from "./ModalWorkingHours"
import ModalSubmitting from "./ModalSubmitting"
import workingDays from "./workingDays"
import { submitData } from "./Networking"
import Toast from "../../common/Toast"

class AddPlace extends Component {
    constructor() {
        super()
        this.state = {
            deleteID: null,
            modalPhotos: false,
            modalVisible: false,
            selector: null,
            addPhotos: false,
            modalCategory: false,
            modalPriceRange: false,
            modalWorkingDays: false,
            modalWorkingHours: false,
            modalSubmitting: false,
            elements: {
                [addPlace.uploadProfilePicture]: {
                    profilePicture: true,
                    textInput: false,
                    value: null,
                    imgUrl: require('../../../../../assets/camera.png'),
                    placeholder: addPlace.uploadProfilePicture,
                    required: true,
                    text: null,
                    style: {}
                },

                [addPlace.nameOfPlace]: {
                    textInput: true,
                    value: null,
                    placeholder: addPlace.nameOfPlace,
                    required: true,
                    style: {},
                    autoFocus: false,
                    onPress: null,
                    onChange: (text) => {
                        var changed = this.state.elements
                        changed[addPlace.nameOfPlace].value = text
                        changed[addPlace.nameOfPlace].style = {}
                        this.setState({
                            elements: changed 
                        })
                    }
                },

                [addPlace.category]: {
                    textInput: true,
                    value: null,
                    placeholder: addPlace.category,
                    required: true,
                    style: {},
                    autoFocus: false,
                    onPress: () => this.setState({ modalCategory: !this.state.modalCategory }),
                    style: { color: "#c9c9c9" },
                    onChange: (text) => {
                        var changed = this.state.elements
                        changed[addPlace.category].value = text
                        changed[addPlace.category].style = {}
                        this.setState({
                            elements: changed 
                        })
                    }
                },

                [addPlace.description]: {
                    textInput: true,
                    value: null,
                    placeholder: addPlace.description,
                    required: false,
                    onPress: null,
                    onChange: (text) => {
                        var changed = this.state.elements
                        changed[addPlace.description].value = text
                        this.setState({
                            elements: changed 
                        })
                    }
                },

                [addPlace.location]: {
                    textInput: true,
                    value: "latitude: 8.981225, longitude: 38.012144",
                    placeholder: "8.981225, 38.012144",
                    required: true,
                    style: {},
                    autoFocus: false,
                    onPress: () => alert("Clicked Location"),
                    style: { color: "#000" },
                    onChange: (text) => {
                        var changed = this.state.elements
                        changed[addPlace.location].value = text
                        changed[addPlace.location].style = {}
                        this.setState({
                            elements: changed 
                        })
                    }
                },

                [addPlace.priceRange]: {
                    textInput: true,
                    value: null,
                    placeholder: addPlace.priceRange,
                    required: false,
                    onPress: () => this.handlePriceRange(),
                    style: { color: "#c9c9c9" },
                    onChange: (text) => {
                        var changed = this.state.elements
                        changed[addPlace.priceRange].value = text
                        this.setState({
                            elements: changed 
                        })
                    }
                },

                [addPlace.tags]: {
                    textInput: true,
                    value: null,
                    placeholder: addPlace.tags,
                    required: false,
                    onPress: null,
                    onChange: (text) => {
                        var changed = this.state.elements
                        changed[addPlace.tags].value = text
                        this.setState({
                            elements: changed 
                        })
                    }
                },

                [addPlace.workingDays]: {
                    textInput: true,
                    value: "",
                    placeholder: addPlace.workingDays,
                    required: true,
                    autoFocus: false,
                    onPress: () => this.handleWorkingDays(),
                    style: { color: "#c9c9c9" },
                    onChange: (text) => {
                        var changed = this.state.elements
                        changed[addPlace.workingDays].value = text
                        changed[addPlace.workingDays].style = {}
                        this.setState({
                            elements: changed 
                        })
                    }
                },

                [addPlace.workHours]: {
                    textInput: true,
                    value: null,
                    style: {},
                    placeholder:  addPlace.workHours,
                    required: false,
                    onPress: () => this.handleWorkingHours(),
                    style: { color: "#c9c9c9" },
                    onChange: (text) => {
                        var changed = this.state.elements
                        changed[addPlace.workHours].value = text
                        this.setState({
                            elements: changed 
                        })
                    }
                },

                [addPlace.owner]: {
                    textInput: true,
                    value: null,
                    placeholder:  addPlace.owner,
                    required: false,
                    onPress: null,
                    onChange: (text) => {
                        var changed = this.state.elements
                        changed[addPlace.owner].value = text
                        this.setState({
                            elements: changed 
                        })
                    }
                },

                uploadPhotos: {
                    profilePicture: false,
                    textInput: false,
                    value: [],
                    imgUrl1: require('../../../../../assets/camera.png'),
                    imgUrl2: require('../../../../../assets/plus.png'),
                    required: false,
                    onChange: () => {
                        for (item in this.state.elements) {
                            alert(item + ": " + this.state.elements[item]['value'])
                        }
                    }
                }
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePicture = this.handlePicture.bind(this)
        this.fromCamera = this.fromCamera.bind(this)
        this.fromGallery = this.fromGallery.bind(this)
        this.deletePhoto = this.deletePhoto.bind(this)
        this.handlePhotos = this.handlePhotos.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
        this.handleWorkingDays = this.handleWorkingDays.bind(this)
        this.handleWorkingHours = this.handleWorkingHours.bind(this)
        this.handlePriceRange = this.handlePriceRange.bind(this)
        this.okHandlerFromCategory = this.okHandlerFromCategory.bind(this)
        this.okHandlerFromPriceRange = this.okHandlerFromPriceRange.bind(this)
        this.okHandlerFromWorkingDays = this.okHandlerFromWorkingDays.bind(this)
        this.okHandlerFromWorkingHours = this.okHandlerFromWorkingHours.bind(this)
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    async handlePicture(selector) {
        this.setState({ modalVisible: !this.state.modalVisible, selector })
    }

    async handlePhotos(id) {
        this.setState({ modalPhotos: !this.state.modalPhotos, deleteID: id })
    }

    deletePhoto() {
        var elements = this.state.elements
        const found = elements['uploadPhotos']['value'].find(value => value.id === this.state.deleteID)
        elements['uploadPhotos']['value'].splice(found.id - 1, 1)
        this.setState({ elements, modalPhotos: !this.state.modalPhotos })
    }

    handleCategory() {
        this.setState({ modalCategory: !this.state.modalCategory })
    }

    okHandlerFromCategory(id, value) {
        var elements = this.state.elements
        elements[addPlace.category]['value'] = id
        elements[addPlace.category]['placeholder'] = value
        elements[addPlace.category]['style'] = { color: "#000" }
        this.setState({ elements, modalCategory: !this.state.modalCategory })
    }

    handlePriceRange() {
        this.setState({ modalPriceRange: !this.state.modalPriceRange })
    }

    okHandlerFromPriceRange(id, value) {
        var elements = this.state.elements
        elements[addPlace.priceRange]['value'] = id
        elements[addPlace.priceRange]['placeholder'] = value
        elements[addPlace.priceRange]['style'] = { color: "#000" }
        this.setState({ elements, modalPriceRange: !this.state.modalPriceRange })
    }

    handleWorkingDays() {
        this.setState({ modalWorkingDays: !this.state.modalWorkingDays })
    }

    okHandlerFromWorkingDays(IDs) {
        var elements = this.state.elements
        var values = ""
        IDs.forEach(item => {
            var { value } = workingDays.find(element => element.id === item)
            values += value + ", "
        })
        elements[addPlace.workingDays]['value'] = IDs.toString()
        elements[addPlace.workingDays]['placeholder'] = values.substr(0, values.length - 2)
        elements[addPlace.workingDays]['style'] = { color: "#000" }
        this.setState({ elements, modalWorkingDays: !this.state.modalWorkingDays })
    }

    handleWorkingHours() {
        this.setState({ modalWorkingHours: !this.state.modalWorkingHours })
    }

    okHandlerFromWorkingHours(value, placeholder) {
        var elements = this.state.elements
        elements[addPlace.workHours]['value'] = value
        elements[addPlace.workHours]['placeholder'] = placeholder
        elements[addPlace.workHours]['style'] = { color: "#000" }
        this.setState({ elements, modalWorkingHours:  !this.state.modalWorkingHours })
    }

    async fromGallery() {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true })
        var elements = this.state.elements
        if (this.state.selector === 'profilePicture' && !cancelled) {
            if (!cancelled) {
                elements[addPlace.uploadProfilePicture]['value'] = uri
                elements[addPlace.uploadProfilePicture]['imgUrl'] = uri
            }
        } else if (!cancelled) {
            var elements = this.state.elements
            var photo = { uri, id: elements['uploadPhotos']['value'].length + 1 }
            elements['uploadPhotos']['value'].push(photo)
        }
        this.setState({ elements, modalVisible: false })
    }

    async fromCamera() {
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({ allowsEditing: true })
        var elements = this.state.elements
        if (this.state.selector === 'profilePicture' && !cancelled) {
            if (!cancelled) {
                elements[addPlace.uploadProfilePicture]['value'] = uri
                elements[addPlace.uploadProfilePicture]['imgUrl'] = uri
            }
        } else if (!cancelled) {
            var elements = this.state.elements
            var photo = { uri }
            elements['uploadPhotos']['value'].push(photo)
        } else 
        this.setState({ elements, modalVisible: false })
    }

    async handleSubmit() {
        var elements = this.state.elements
        var errors = []
        if (!elements[addPlace.uploadProfilePicture]['value']) {
            elements[addPlace.uploadProfilePicture]['text'] = 'Required'
        }

        for (item in elements) {
            if (!elements[item]['value'] && elements[item]['required'] && elements[item]['textInput']) {
                elements[item]['autoFocus'] = true
                elements[item]['style'] = { backgroundColor: "red" }
                errors.push('error')
            }
        }

        if (errors.length > 0) {
            this.setState({ elements })
        } else {
            const placeProfile = {
                profilePicture: this.state.elements[addPlace.uploadProfilePicture]['value'],
                name: this.state.elements[addPlace.nameOfPlace]['value'],
                category: this.state.elements[addPlace.category]['value'],
                description: this.state.elements[addPlace.description]['value'],
                location: this.state.elements[addPlace.location]['value'],
                priceRange: this.state.elements[addPlace.priceRange]['value'],
                tags: this.state.elements[addPlace.tags]['value'],
                workingDays: this.state.elements[addPlace.workingDays]['value'].toString(),
                workHours: this.state.elements[addPlace.workHours]['value'],
                owner: this.state.elements[addPlace.owner]['value'],
                photos: this.state.elements['uploadPhotos']['value'].map(value => value.uri)
            }
            this.setState({ modalSubmitting: !this.state.modalSubmitting })
            const { status } = await submitData(placeProfile)
            if (status === 200) {
                Toast.show("Place uploaded", Toast.LONG)
                this.setState({ modalSubmitting: !this.state.modalSubmitting })
            }
            else {
                console.log("Upload Failed")
            }
        }
    }

    render() {
        var elements = []
        var element = null
        for (item in this.state.elements) {
            if (this.state.elements[item]['required'] && this.state.elements[item]['textInput']) {
                if (this.state.elements[item]['onPress'] === null) {
                    element = (
                        <View style={styles.ElementContainer} key={item}>
                            <TextInput
                                onChangeText={this.state.elements[item]['onChange']}
                                placeholder={this.state.elements[item]['placeholder']} 
                                style={[styles.TextInputStyle, this.state.elements[item]['style']]}
                            />
                            <Text style={styles.Star}>*</Text>
                        </View>
                    )
                } else {
                    element = (
                        <View style={styles.ElementContainer} key={item}>
                            <TouchableOpacity style={[styles.TextInputStyle, this.state.elements[item]['style']]} key={item} onPress={this.state.elements[item]['onPress']}>
                                <Text style={this.state.elements[item]['style']}>{this.state.elements[item]['placeholder']}</Text>
                            </TouchableOpacity>
                            <Text style={styles.Star}>*</Text>
                        </View>
                    )
                }
            } else if (this.state.elements[item]['textInput']) {
                if (this.state.elements[item]['onPress'] == null) {
                    element = (
                        <TouchableOpacity style={styles.ElementContainer} key={item} onPress={this.state.elements[item]['onPress']}>
                            <TextInput
                                onChangeText={this.state.elements[item]['onChange']}
                                placeholder={this.state.elements[item]['placeholder']}
                                style={styles.TextInputStyle}
                            />
                        </TouchableOpacity>
                    )
                } else {
                    element = (
                        <View style={styles.ElementContainer} key={item}>
                            <TouchableOpacity style={styles.TextInputStyle} key={item} onPress={this.state.elements[item]['onPress']}>
                                <Text style={this.state.elements[item]['value']? { color: "#000" } :{ color: "#c9c9c9" }}>{this.state.elements[item]['placeholder']}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            } else if (this.state.elements[item]['profilePicture']) {
                if (this.state.elements[item]['value']) {
                    element = (
                        <TouchableOpacity onPress={() => this.handlePicture('profilePicture')} key={item}>
                            <Image source={{ uri: this.state.elements[item]['value'] }} key={item} style={styles.uploadedImage} />
                        </TouchableOpacity>
                    )
                } else {
                    if (!this.state.elements[item]['text']) {
                        element = (
                            <View key={item}>
                                <TouchableOpacity style={[styles.uploadPhoto]} onPress={() => this.handlePicture('profilePicture')}>
                                    <Image source={this.state.elements[item]['imgUrl']} style={styles.uploadImage} />
                                    <Text style={styles.uploadPhotoText}>{this.state.elements[addPlace.uploadProfilePicture]['placeholder']}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    } else {
                        element = (
                            <View key={item}>
                                <TouchableOpacity style={[styles.uploadPhoto, { backgroundColor: "red" }]} onPress={() => this.handlePicture('profilePicture')}>
                                    <Image source={this.state.elements[item]['imgUrl']} style={styles.uploadImage} />
                                    <Text style={styles.uploadPhotoText}>{this.state.elements[addPlace.uploadProfilePicture]['placeholder']}</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row" }}><Text style={{ color: "orange" }}>*</Text><Text> {this.state.elements[item]['text']}</Text></View>
                            </View>
                        )
                    }
                }
            } else {
                const photos = this.state.elements['uploadPhotos']['value'].map(value => (
                    <TouchableOpacity key={value} onPress={() => this.handlePicture('photo')} style={styles.uploadPhotos}>
                        <Image source={value} style={styles.uploadPhotos} />
                    </TouchableOpacity>
                ))
                element = (
                    <View style={styles.footers} key={item} onPress={this.state.elements[item]['onChange']}>
                        <TouchableOpacity onPress={this.handleSubmit} style={[styles.uploadPhotos]}>
                            <Image source={this.state.elements[item]['imgUrl2']} style={[styles.uploadPhotos, { marginRight: 10 }]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handlePicture} style={[styles.uploadPhotos]}>
                            <Image source={this.state.elements[item]['imgUrl1']} style={[styles.uploadPhotos, { marginRight: 10 }]} />
                        </TouchableOpacity>
                    </View>
                )
            }
            elements.push(element)
        }

        var photos = []
        if (this.state.elements['uploadPhotos']['value'].length > 0) {
            this.state.elements['uploadPhotos']['value'].forEach(value => {
                photos.push(
                    <TouchableOpacity onPress={() => this.handlePhotos(value.id)} key={value.uri}>
                        <Image source={{uri: value.uri}} style={{ height: 100, width: 100, marginRight: 10 }} />
                    </TouchableOpacity>
                )
            })
        }

        return (
            <TouchableHighlight>
                <ScrollView style={styles.ScrollView}>
                    <Header />
                    <ModalImage visible={this.state.modalVisible} modalHandler={this.handlePicture} fromGallery={this.fromGallery} fromCamera={this.fromCamera} />
                    <ModalDelete visible={this.state.modalPhotos} modalHandler={this.handlePhotos} yesHandler={this.deletePhoto} noHandler={this.handlePhotos}/>
                    <ModalCategory visible={this.state.modalCategory} modalHandler={this.handleCategory} okHandler={this.okHandlerFromCategory} />
                    <ModalPriceRange visible={this.state.modalPriceRange} modalHandler={this.handlePriceRange} okHandler={this.okHandlerFromPriceRange}/>
                    <ModalWorkingDays visible={this.state.modalWorkingDays} modalHandler={this.handleWorkingDays} okHandler={this.okHandlerFromWorkingDays}/>
                    <ModalWorkingHours visible={this.state.modalWorkingHours} modalHandler={this.handleWorkingHours} okHandler={this.okHandlerFromWorkingHours}/>
                    <ModalSubmitting visible={this.state.modalSubmitting} modalHandler={this.handleSubmit} />
                    {elements}
                    <ScrollView horizontal={true} style={[styles.ScrollView, { flexDirection: "row" }]}>
                        {photos}
                    </ScrollView>
                </ScrollView>
            </TouchableHighlight>
        )
    }
}

export default AddPlace