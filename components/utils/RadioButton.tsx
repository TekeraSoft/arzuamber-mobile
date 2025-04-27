import {TouchableOpacity, View, Text, StyleSheet} from "react-native";

const RadioButton = ({ label, value, selected, onSelect }) => {
    return (
        <TouchableOpacity style={styles.radioContainer} onPress={() => onSelect(value)}>
            <View style={[styles.radioCircle, selected === value && styles.selectedRadio]}>
                {selected === value && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

export default RadioButton;

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRadio: {
        borderColor: '#007aff',
    },
    radioDot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#007aff',
    },
    label: {
        marginLeft: 10,
        fontSize: 16,
    },
});