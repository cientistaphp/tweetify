import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../services/api';

export default function New({ navigation }) {
  const [newTweet, setNewTweet] = useState('');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleTweet = useCallback(async () => {
    if (!newTweet.trim()) return;

    const author = await AsyncStorage.getItem('@OmniStack:username');

    await api.post('tweets', {
      author,
      content: newTweet,
    });

    goBack();
  }, [newTweet, goBack]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="close" size={24} color="#4BB0EE" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTweet} style={styles.button}>
          <Text style={styles.buttonText}>Tweetar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        multiline
        placeholder="O que está acontecendo?"
        placeholderTextColor="#999"
        value={newTweet}
        onChangeText={setNewTweet}
        returnKeyType="send"
        onSubmitEditing={handleTweet}
        autoCorrect
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#4BB0EE",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: "#333"
  }
});
