
import React,{useState} from 'react';
import { StyleSheet, Text, View,FlatList,TextInput, ScrollView } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
export default function App() {
  const [input,setInput]=useState("");
  const [todos,setTodos]=useState([]);

  const addItem = ()=> {
    if (!input) {
    setInput("")
    return alert('Input Text!')
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
    })
  }
  setTodos([...todos])
  setInput("")
  console.log([...todos])
}
  const deleteItem = (id) =>{
    setTodos((prev)=>{
      return prev.filter(todo => todo.id != id)
    })
  }
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
      <View style={styles.content}>
      
        <View style={styles.list}>
          <Text> Enter Your Plans </Text>
          <TextInput 
            style={styles.input}
            value={input}
            onChangeText={(value) => setInput(value)}
          />
          <Text> What You Entered : {input} </Text>
          <AddTodo addItem={addItem} />
          <FlatList
            data={todos}
            renderItem={({item})=>(
              <TodoItem item={item} deleteItem={deleteItem}/>
            )}
          />
      </View>
      
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    padding:50
  },
  list:{
    marginTop:20,
    alignItems:'center'
  },
  input:{
    width:200,
    margin:10,
    padding:8,
    borderColor:'#777',
    borderWidth:1
  }
});
