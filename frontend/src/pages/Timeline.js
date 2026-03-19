import React, { Component } from 'react';
import api from '../services/api';
import socketIOClient from "socket.io-client";

import twitterLogo from '../twitter.svg';
import './Timeline.css';

import Tweet from '../components/Tweet';

export default class Timeline extends Component {
    state = {
        tweets: [],
        newTweet: '',
    };

    async componentDidMount() {
        this.subscribeToEvents();

        try {
            const response = await api.get('/tweets');
            this.setState({ tweets: response.data });
        } catch (err) {
            console.log("Erro ao buscar tweets:", err);
        }
    }

    subscribeToEvents = () => {
        const io = socketIOClient('https://tweetify-production.up.railway.app');

        io.on('tweet', data => {
            this.setState(prevState => ({
                tweets: [data, ...prevState.tweets]
            }));
        });

        io.on('like', data => {
            this.setState(prevState => ({
                tweets: prevState.tweets.map(tweet =>
                    tweet._id === data._id ? data : tweet
                )
            }));
        });
    };

    handleNewTweet = async (e) => {
        if (e.key !== 'Enter') return;

        e.preventDefault(); // 🔥 evita quebrar linha

        const content = this.state.newTweet;
        const author = localStorage.getItem("@GoTwitter:username");

        try {
            await api.post('/tweets', { content, author });
            this.setState({ newTweet: '' });
        } catch (err) {
            console.log("Erro ao enviar tweet:", err);
        }
    };

    handleInputChange = e => {
        this.setState({ newTweet: e.target.value });
    };

    render() {
        return (
            <div className="timeline-wrapper">
                <img height={24} src={twitterLogo} alt="GoTwitter" />

                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está acontecendo?"
                    />
                </form>

                <ul className="tweet-list">
                    {this.state.tweets.map(tweet => (
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))}
                </ul>
            </div>
        );
    }
}