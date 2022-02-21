import { makeStyles } from '@material-ui/core/styles';

export const  dynamicStyle= (value,size) => {
    return ({
        boxShadow: '0 4px 10px rgb(0 0 0 / 0.3)',
        backgroundColor: value,
        color: value === 'yellow' || value === 'white' ? 'black' : 'white',
        width: size?size:'',
        height: size?size:'',
        // marginLeft:'5px',
    })
}
export const customStyle = (value,size) => {
    return ({
        boxShadow: '0 4px 10px rgb(0 0 0 / 0.3)',
        backgroundColor: value,
        color: value === 'yellow' || value === 'white' ? 'black' : 'white',
        width: size?size:'',
        height: size?size:'',
        fontWeight:'600',
        fontFamily:'Helvetica',
    })
}

export const style = (theme) => ({
    selection: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    card: {
        alignSelf: 'center',
        borderRadius: 10,
        minWidth: 380,
        width: 380,
        height: "650px",
        marginRight: 5,
        marginLeft: 5,

    },
    root: {
        backgroundColor: 'rgb(240, 240, 240)',
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    listtextitem: {
        marginTop: '3px',
        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',

        borderRadius: 10,
    },
    listTextItemWallet: {
        marginTop: '1px',
        height: '90px',
        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
        borderRadius: 10,
    },
    list: {
        // width: '95%',
        margin: "0 10px 0",
        height: '100%',
    },
    mainHeaderGrid: {
        backgroundColor: 'rgb(131,10,209)',
        height: '40%',
        borderRadius: '10px 10px 0 0 ',
    },
    headerGrid: {
        backgroundColor: 'rgb(131,10,209)',
        height: '155px',
        borderRadius: '10px 10px 0 0 ',
    },
    bodyGrid: {
        height: '535px',
    },

    mainBodyGrid: {
        height: '50%',

    },
    item: {
        width: '95%',
        marginTop: 5,
        alignItems: 'center',
        display: "flex",
        justifyContent: "center",
    },

    gamecode: {
        textTransform: 'uppercase',
        alignSelf: 'center',
        fontWeight: 700,
        color: 'blue',
    },

    codecaption: {
        textTransform: 'uppercase',
        color: 'white',
    },
    papercode: {
        height: 110,
        width: 110,
        borderRadius: 100,
        display: "flex",
        justifyContent: 'center',
        backgroundColor: 'rgb(245, 245, 245)'

    },
    button: {
        width: 100,
        marginTop: 10,
        borderRadius: 25
    },
    mainGrid: {
        height: '100%',

    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },

    button100: {
        width: 200,
        borderRadius: 25,
        marginBottom: 30
    },

    mainfooterGrid: {
        height: '10%',

    },
    link: {
        textDecoration: 'none',
    },
    papername: {
        height: 45,
        width: '100%',
        borderRadius: 100,
        display: "flex",
        justifyContent: 'center',
        backgroundColor: 'rgb(245, 245, 245)'

    },
    balance: {
        width: '96%',
        textAlign: 'center',
        marginLeft: '10px',
        color: 'white',
        // backgroundColor:'gray'
    },
    headername: {
        color: 'white',
        marginTop: '10px'
    },
    walletName: {
        color: 'white',
        fontWeight: 600,
    },
    valueButton: {
        width: '60px',
        height: '35px',
        marginTop: "5px"
    },
    footerCaption: {
        width: '100%',
        // backgroundColor:'red'
    }

});

// export {style}
