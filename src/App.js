import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

import jsTPS from './lib/jsTPS/jsTPS'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    todoItem: null,

    jsTPS: new jsTPS()
  }

  /*
  constructor(props) {
    super(props);
    //this.ctrlZYFunction = this.ctrlZYFunction.bind(this);
    //this.undoTransaction = this.undoTransaction.bind(this);
    //this.redoTransaction = this.redoTransaction.bind(this);
  }*/
  /*
  ctrlZYFunction(event){ // key pressing input function
    if(event.keyCode === 90 && event.ctrlKey) { //ctrl + z
      this.undoTransaction();
    } else if(event.keyCode === 89 && event.ctrlKey) { // ctrl + y
      this.redoTransaction();
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.ctrlZYFunction, false)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.ctrlZYFunction, false);
  }*/

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    this.state.jsTPS.clearAllTransactions();
    console.log(this.state.jsTPS.toString()); //
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    /*console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);*/
  }

  // load item to edit
  loadItem = (listItem) => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
    this.setState({todoItem: listItem});
  }

  /*undoTransaction() {
    this.state.jsTPS.undoTransaction();
    console.log(this.state.jsTPS.toString());
  }

  redoTransaction() {
    this.state.jsTPS.doTransaction();
    console.log(this.state.jsTPS.toString());
  }*/

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
          loadList={this.loadList.bind(this)} 
          todoLists={this.state.todoLists} />;
          //todoList={this.state.currentList} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          loadList={this.loadList.bind(this)}
          todoList={this.state.currentList} 
          loadItem={this.loadItem.bind(this)} 
          todoLists={this.state.todoLists} 
          jsTPS={this.state.jsTPS} />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          loadList={this.loadList.bind(this)}
          todoList={this.state.currentList}
          todoItem={this.state.todoItem} 
          currentScreen={this.state.currentScreen} //required
          jsTPS={this.state.jsTPS} />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;