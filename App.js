
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
    let chck = todos.map((e) => {
      if (e.id === item.id) {
        e.checkDone = !e.checkDone
      }
      return e;
    })
    setTodos(chck)
    console.log(chck)
  }
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = { backgroundColor: 'white', padding: 20, width: 300 };
  return (
    <>
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} contentContainerStyle={containerStyle}>
            <View style={styles.button}>
              <Button icon="content-save-edit" mode="contained">
                Edit
              </Button>
            </View>
            <View style={styles.button}>
              <Button icon="check-circle" mode="contained" onPress={() => checkItem(item)}>
                {checkDone ? console.log("gauqmda monishvna") : console.log("moinishna")}
              </Button>
            </View>
          </Modal>
        </Portal>
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
                      <TodoItem setVisible={setVisible} item={item} deleteItem={deleteItem} checkItem={checkItem} />
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
