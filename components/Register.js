import { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        try {
            if (username === '' || name === '' || password === '' || confirmPassword === '') {
                alert('Vui lòng nhập đầy đủ thông tin')
            }
            else {
                if (password === confirmPassword) {
                    await AsyncStorage.setItem('currentUser', JSON.stringify({
                        username: username,
                        name: name,
                        password: password,
                        confirmPassword: confirmPassword,
                    }))

                    navigation.navigate('Login');
                }

                else {
                    alert('Mật khẩu nhập lại không đúng')
                }
            }
        } catch (error) {
            alert('Failed to save the data to the storage')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Username'
                        name='username'
                        onChangeText={newText => setUsername(newText)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Full name'
                        name='name'
                        onChangeText={newText => setName(newText)}

                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        name='password'
                        onChangeText={newText => setPassword(newText)}
                        secureTextEntry />

                    <TextInput
                        style={styles.textInput}
                        placeholder='Confirm password'
                        name='confirmPassword'
                        onChangeText={newText => setConfirmPassword(newText)}
                        secureTextEntry />

                    <Button
                        style={styles.button}
                        title='Register' onPress={handleRegister} />

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text>Or login now!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#eee',
    },

    form: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        marginBottom: 20,
        minWidth: 200,
        textAlign: 'center'
    },

    button: {}
});