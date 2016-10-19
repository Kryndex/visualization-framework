import { theme } from "../../theme";

const style = {
    navBar: {
        fontSize: "12px",
        fontWeight: 200,
    },
    container: {
        margin: "10px",
        position: "relative",
    },
    menuLogo: {
        textAlign: "center",
        fontSize: "120%",
        padding: "10px",
        color: theme.palette.greyDarkerColor,
    },
    nestedItems: {
        padding: 0,
    },
    nestedItem: {
        fontSize: "14px",
        paddingLeft: "16px",
    },
    listItem: {
    },
    subHeader: {
        borderBottom: theme.palette.thinBorder + theme.palette.greyDarkerColor,
        height: "35px"
    }
}

export default style;
