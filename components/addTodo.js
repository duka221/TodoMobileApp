import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function AddTodo(props) {

  return (
    <View style={styles.button}>
      <Button icon="plus-circle" mode="contained" onPress={props.addItem}>
        Add
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: 120,
  },
});