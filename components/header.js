import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
export default function Header() {
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title="Test" subtitle="" />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
    )
}
const styles = StyleSheet.create({
    header: {
        height: 65,
        paddingTop: 35,
        backgroundColor: '#40CEEB'
    },
    title: {
        textAlign: 'center',
        color: '#343434',
        fontSize: 20,
        fontWeight: "bold"
    }
});