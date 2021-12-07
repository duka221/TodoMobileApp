import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

export default function TodoItem(props) {
    const ONE_SECOND_IN_MS = 100;
    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS
    ];
    const [changed, setChanged] = useState(false);
    return (
        <>
            <TouchableOpacity style={{ marginTop: 50 }} onPress={() => {
                props.deleteItem(props.item.id);
                Vibration.vibrate(PATTERN)
            }} onLongPress={() => { props.setVisible(true); Vibration.vibrate(PATTERN) }}
            >
                <View style={styles.item}>
                    <MaterialIcons name="delete" size={18} color='red' />
                    <Text style={styles.itemtext}>  {props.item.text}</Text>
                </View>
                <Button onPress={() => {
                    props.checkItem(props.item);
                    setChanged(!changed);
                }}>{changed ? "checked" : "no checked"}</Button>
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#6495ed',
        borderWidth: 1,
        // borderStyle: 'dashed',
        borderRadius: 15,
        width: 150,
        flexDirection: 'row'
    },

    itemtext: {
        marginLeft: 10
    },

});