import React from 'react';
import { StyleSheet, Text, TouchableOpacity,} from 'react-native';
export default function TodoItem(props){
    return (
        
        <TouchableOpacity onPress={()=> props.deleteItem(props.item.id)}>
            <Text style={styles.item}> {props.item.text} </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    item:{
        padding:16,
        marginTop:16,
        borderColor:'#6495ed',
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:7,
    }
});