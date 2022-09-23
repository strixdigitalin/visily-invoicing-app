import { StyleSheet } from 'react-native';
import { COLORS } from './theme';
const commonStyle = StyleSheet.create({
    label: {
        position: 'absolute',
        backgroundColor: '#fff',
        left: 22,
        top: -11,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    textLabel: {
        color: '#222222', backgroundColor: '#f5f5f5', marginLeft: 10, marginBottom: -10, zIndex: 1, width: 124, paddingHorizontal: 9,
        fontSize: 14, fontWeight: "500"
    },
    submitBtn: {
        width: "100%", height: 44,
        backgroundColor: COLORS.primary,
        borderRadius: 9,
        paddingHorizontal: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    flex(flex) {
        return {
            flex,
        };
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    content: {
        flex: 1,
        width: '100%',
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: "wrap"
    },
    rowSpaceBetween2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowSpaceEven: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    rowFlexStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rowFlexEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rowSpaceAround: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    color(color) {
        return {
            color,
        };
    },
    marginVertical(value) {
        return {
            marginVertical: value,
        };
    },
    marginHorizontal(value) {
        return {
            marginHorizontal: value,
        };
    },
    margin(margin) {
        return {
            margin: margin,
        };
    },
    marginTop(margin) {
        return {
            marginTop: margin,
        };
    },
    marginBottom(margin) {
        return {
            marginBottom: margin,
        };
    },
    paddingVertical(value) {
        return {
            paddingVertical: value,
        };
    },
    paddingHorizontal(value) {
        return {
            paddingHorizontal: value,
        };
    },
    padding(padding) {
        return {
            padding: padding,
        };
    },
    justifyContent(type) {
        return {
            justifyContent: `${type}`,
        };
    },
    backgroundColor(bgColor) {
        return {
            backgroundColor: `${bgColor}`,
        };
    },
    width(width) {
        return {
            width,
        };
    },
    height(height) {
        return {
            height,
        };
    },
});
export default commonStyle;
