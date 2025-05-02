import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomCheckbox = ({label, checked, toggleCheckbox}) => {

    return (
        <TouchableOpacity style={styles.container} onPress={toggleCheckbox}>
            <View style={[styles.checkbox, checked && styles.checked]}>
                {checked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checked: {
        backgroundColor: '#4caf50',
        borderColor: '#4caf50',
    },
    checkmark: {
        color: '#fff',
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
    },
});

export default CustomCheckbox;