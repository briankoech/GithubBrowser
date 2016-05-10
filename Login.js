
import React, { Component, Text, StyleSheet, View, Image, TextInput, TouchableHighlight } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  onLogginPressed = () => {
    console.log(this.state.username, this.state.password);
  };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} 
        source={require('image!Octocat')} >
        </Image>
        <Text style={styles.heading}>
          Github browser
        </Text>
        <TextInput 
        onChangeText={(text) => {this.setState({username: text})}}
        style={styles.input}
        placeholder="Github username">
        </TextInput>
        <TextInput
        onChangeText={(text) => {this.setState({password: text})}}
        style={styles.input}
        placeholder="Github password"
        secureTextEntry="true">
        </TextInput>
        <TouchableHighlight 
        onPress={this.onLogginPressed}
        style={styles.button}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>
      </View>
    ); 
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  }
})