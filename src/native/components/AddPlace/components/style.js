import {
    StyleSheet
} from "react-native"

export default styles = StyleSheet.create({
    ScrollView: {
        marginTop: 30,
        marginLeft: 20
    },

    ElementContainer: {
        flexDirection: "row",
        flex: 1,
        marginBottom: 10,
        marginTop: 10
    },

    uploadPhoto: {
        justifyContent: "center",
        alignContent: "center",
        paddingLeft: 15,
        paddingRight: 15,
        flexWrap: "wrap",
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        height: 100,
        width: 100,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 20,
        backgroundColor: "#f3f3f3"
    },

    closeButton: {
        width: 30,
        height: 30,
        alignSelf: "flex-end"
    },

    progressContainer: {
        alignItems: "center",
        flexDirection: "row"
    },

    progressBar: {
        marginLeft: 40,
        width: 150,
        height: 150
    },

    uploadImage: {
        alignSelf: "center",
        width: 30,
        height: 30
    },

    uploadedImage: {
        alignSelf: "flex-start",
        width: 140,
        height: 80
    },

    footers: {
        justifyContent: "center",
        alignContent: "center",
        height: 80,
        width: 115,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 20,
        backgroundColor: "#f3f3f3",
        flexDirection: "row",
        marginBottom: 40
    },

    uploadPhotos: {
        alignSelf: "center",
        width: 30,
        height: 30
    },

    uploadPhotoText: {
        color: "#b3b3b3",
        textAlign: "center",
        fontSize: 18
    },

    TextInputStyle: {
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        height: 'auto',
        width: '80%',
        height: 50,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 20,
        backgroundColor: "#f3f3f3"
    },

    ModalTextInput: {
        height: "auto",
        width: "100%",
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 20,
        backgroundColor: "#f3f3f3"
    },
    
    Star: {
        marginTop: 13,
        color: "orange"
    },

    Header: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 30
    },

    backButton: {
        width: 35,
        height: 35
    },

    HeaderText: {
        color: "#008000",
        marginTop: 5,
        marginLeft: 5,
        fontSize: 20,
        fontWeight: "bold"
    },

    modal: {
        width: "50%",
        height: "10%",
        alignSelf: "center",
        marginTop: "145%",
        justifyContent: "center",
        backgroundColor: "#e2d2d2"
    },

    selectors: {
        display: "flex",
        flexDirection: "column",
        width: 100,
        height: 20,
        marginBottom: 50,
        justifyContent: "flex-start"
    },

    selectorsProgress: {
        flexDirection: "row"
    },

    overlayMiddle: {
        height: "60%",
        width: "100%"
    },

    overlayMiddleLittle: {
        height: "13%",
        width: "80%"
    },

    overlayBottom: {
        marginTop: "120%",
        height: "30%",
        width: "100%"
    },

    overlayBottomBig: {
        marginTop: "130%",
        height: "60%",
        width: "100%"
    },

    overlayBottomLittle: {
        marginTop: "130%",
        height: "20%",
        width: "100%"
    },

    selectorsImage: {
        flexDirection: "column",
        width: 100,
        height: 20,
        justifyContent: "flex-start"
    },

    uploadSelectors:{
        display: "flex",
        flexDirection: "column",
        width: 100,
        height: 20,
        justifyContent: "flex-start"
    },

    selectorItems: {
        flexDirection: "row",
        paddingTop: 3,
        alignItems: "center",
        width: 100,
        height: 30,
        margin: 10,
    },

    selectorText: {
        fontSize: 18
    },

    uploadedPhotos: {
        flexDirection: "row",
        width: 50,
        height: 50
    },

    pickerStyle: {
        width: "400%",
    },

    modalHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    modalHeaderLeft: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    modalMiddle: {
        width: '90%',
        height: '60%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        elevation: 20,
        padding: 10,
        paddingLeft: 40,
        borderRadius: 4,
        marginTop: "40%"
    },

    modalProgress: {
        width: '90%',
        height: '60%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        elevation: 20,
        padding: 10,
        paddingLeft: 40,
        borderRadius: 4,
        marginTop: "40%"
    },

    modalBottom: {
        width: '100%',
        height: '30%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        elevation: 20,
        paddingLeft: 60,
        padding: 10,
        borderRadius: 4,
        marginTop: "210%"
    },

    modalTop: {
        flexDirection: "row"
    },

    modalBottomImage: {
        width: '100%',
        height: '28%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        elevation: 20,
        paddingLeft: 160,
        padding: 10,
        borderRadius: 4,
        marginTop: "220%"
    },

    modalGeneral: {
        width: '100%',
        height: '35%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        elevation: 20,
        paddingLeft: 60,
        paddingBottom: 30,
        padding: 10,
        borderRadius: 4,
        marginTop: "110%"
    },

    modalTitle: {
        width: "200%",
        fontSize: 18,
        flexDirection: "row"
    },

    modalOk: {
        alignItems: "center",
        width: "100%",
        height: "110%",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#fff",
        backgroundColor: "green",
        alignSelf: "center",
        marginRight: 10
    },

    modalCancel: {
        alignItems: "center",
        width: "100%",
        height: "110%",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "green",
        backgroundColor: "#fff",
        alignSelf: "center"
    },

    modalOkText: {
        color: "#fff",
        fontSize: 20
    },

    modalCancelText:{
        fontSize: 20
    },

    modalButtons: {
        flexDirection: "row"
    },

    label: {
        width: "100%",
        marginRight: "10%"
    },

    timeBox: {
        flexDirection: "row",
        paddingBottom: 7
    },

    timeText: {
        fontSize: 18
    }
})