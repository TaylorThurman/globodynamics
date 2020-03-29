import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

class VideoDetail extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        let tubeId = this.props.navigation.getParam('ytubeId', 'NO VIDEO');
        let tubeUrl = `https://www.youtube.com/embed/${tubeId}`;
        return (
            <WebView
                style={{ marginTop: 20}}
                javaScriptEnabled={true}
                source={{ uri: tubeUrl }}
            />
        );
    }
}

export default VideoDetail;
