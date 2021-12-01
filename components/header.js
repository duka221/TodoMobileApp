import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
export default function Header (){
    return(
        <View style={styles.header}>
            <Text style={styles.title}>
                Cyber Solution
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header:{
        height:65,
        paddingTop:35,
        backgroundColor:'#40CEEB'
    },
    title:{
        textAlign:'center',
        color:'#343434',
        fontSize:20,
        fontWeight:"bold"
    }
});