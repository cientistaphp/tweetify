import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import io from 'socket.io-client';

import api from '../services/api';
import Tweet from '../components/Tweet';

export default function Timeline({ navigation }) {
  const [tweets, setTweets] = useState([]);
  const socketRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Início',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('New')}>
          <Icon
            name="add-circle-outline"
            size={24}
            color="#4BB0EE"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    loadTweets();
    subscribeToEvents();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  async function loadTweets() {
    const response = await api.get('tweets');
    setTweets(response.data);
  }

  function subscribeToEvents() {
    socketRef.current = io('http://localhost:3000', {
      transports: ['websocket'],
    });

    socketRef.current.on('tweet', data => {
      setTweets(prevTweets => [data, ...prevTweets]);
    });

    socketRef.current.on('like', data => {
      setTweets(prevTweets =>
        prevTweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      );
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        keyExtractor={tweet => tweet._id}
        renderItem={({ item }) => <Tweet tweet={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

