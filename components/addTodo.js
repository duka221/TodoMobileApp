import React,{useState} from 'react';
import { StyleSheet,  View, Button } from 'react-native';
export default function AddTodo(props) {
    
 return (
    <View style={styles.button}>
    <Button style={styles.pressbutton} title= 'Add' onPress={props.addItem}/> 
    </View>
 )
}
const styles = StyleSheet.create({
    button:{
      marginTop:20,
      width:120,
    },
    pressbutton:{
        color:'#40CEEB'
    }
  });