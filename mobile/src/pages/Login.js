import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function loadUser() {
      const storedUsername = await AsyncStorage.getItem('@OmniStack:username');

      if (storedUsername) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Timeline' }],
        });
      }
    }

    loadUser();
  }, [navigation]);

  async function handleLogin() {
    if (!username.trim()) return;

    await AsyncStorage.setItem('@OmniStack:username', username);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Timeline' }],
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        <Icon name="twitter" size={64} color="#4BB0EE" />

        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
          onSubmitEditing={handleLogin}
          returnKeyType="send"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#4BB0EE",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
