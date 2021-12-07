
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Alert, SafeAreaView } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AsyncStorage from "@react-native-async-storage/async-storage"
import AddTodo from './components/addTodo';
import { TextInput } from 'react-native-paper';
import { Modal, Portal, Button, Provider } from 'react-native-paper';

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const _storeData = async (item) => {
    try {
      await AsyncStorage.setItem(
        'item',
        JSON.stringify(item)
      );
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('item');
      if (value !== null) {
        // We have data!!
        setTodos(JSON.parse(value))
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const addItem = () => {
    if (!input) {
      setInput("")
      return Alert.alert('Input Text!')
    }
    else {
      let lengthCounter = 0
      let idCounter = 1
      if (todos.length <= 0) {
        idCounter = 1
      } else {
        lengthCounter = todos.length - 1
        idCounter = todos[lengthCounter].id + 1
      }
      todos.push({
        text: input,
        id: idCounter,
        checkDone: false
      })
    }
    setTodos([...todos])
    setInput("")
    _storeData(todos);
    console.log([...todos])
  }
  const deleteItem = (id) => {
    setTodos((prev) => {
      return prev.filter(todo => todo.id != id)
    })

    _storeData(todos.filter((todo) => todo.id != id));
  }

  React.useEffect(() => {
    _retrieveData()
  }, [])

  const checkItem = (item) => {
    todos.map((secondItem) => {
      if (secondItem.id === item.id) {
        secondItem.checkDone = !secondItem.checkDone;
      }

    });

    console.log(todos);
  }
  return (
    <>
      <Provider>
        <View style={styles.container}>
          <SafeAreaView>
            <Header />
            <ScrollView nestedScrollEnabled={true}>
              <View style={styles.content}>

                <View style={styles.list}>
                  <TextInput label="Enter Your Plans" style={styles.input}
                    mode='outlined'
                    value={input}
                    onChangeText={(value) => {
                      setInput(value);
                    }
                    }
                  />
                  <AddTodo addItem={addItem} />
                  <FlatList
                    data={todos}
                    renderItem={({ item }) => (
                      <TodoItem item={item} deleteItem={deleteItem} checkItem={checkItem} />
                    )}
                  />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 30
  },
  content: {
    padding: 50
  },
  button: {
    marginTop: 20,
    width: 120,
    marginLeft: 65
  },
  list: {
    marginTop: 20,
    alignItems: 'center'
  },
  input: {
    width: 200,
  }
});
