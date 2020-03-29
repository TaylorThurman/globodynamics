import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Alert, AsyncStorage} from "react-native";
import {Platform} from "react-native-web";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            loggedUser: false
        }
    }

    toggleUser = () => {
        if (this.state.isLoggedIn) {
            AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                this.setState({
                    isLoggedIn: false,
                    loggedUser: false
                });
                Alert.alert('User logged out');
            })

        }
        else {
            this.props.navigate('LoginRT')
        }
    };

    componentDidMount() {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if (result === 'none') {
                console.log('NONE');
            } else if (result == null) {
                AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                    console.log('Set user to NONE');
                })
            } else {
                this.setState({
                    isLoggedIn: true,
                    loggedUser: result
                });
            }
        })
    }

    render() {
        let display = this.state.isLoggedIn ? this.state.loggedUser : this.props.message;
        return (
            <View style={styles.headStyle}>
                <Image style={styles.logoStyle} source={require('./img/Globo_logo_REV.png')} />
                <Text style={styles.headText} onPress={this.toggleUser}>{display}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headText: {
        paddingTop: 15,
        textAlign: 'right',
        color: '#fff',
        fontSize: 20,
        flex: 1
    },
    headStyle: {
        paddingTop: 50,
        paddingRight: 10,
        backgroundColor: Platform.OS === 'android' ? '#31e981' : '#35605a',
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#000'
    },
    logoStyle: {
        flex: 1,
        width: undefined,
        height: undefined
    }
});

export default Header;
