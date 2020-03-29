import React from 'react';
import { Text, View, FlatList} from 'react-native';
import HTML from 'react-native-render-html';

export class Blog extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { blogLoaded: false };
    }

    componentDidMount(){
        return fetch('https://renemorozowich.com/wp-json/wp/v2/posts')
            .then((response) => response.json())
            .then((responseJson) =>{
                this.setState({
                    blogLoaded: true,
                    blogList: Array.from(responseJson)
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    chooseBlog = (blogID)=>{
        this.props.navigation.navigate('BlogDetailRT', {blogId: blogID} );
    }

    render() {
        return(
            <View>
                { this.state.blogLoaded && (
                    <View style={{ paddingTop: 40}} >
                        <FlatList
                            data={ this.state.blogList }
                            keyExtractor={(item, index) => item.id.toString()}
                            renderItem={({item}) =>
                                <BlogItem
                                    id={item.id}
                                    title={item.title.rendered}
                                    imageSrc={'https://renemorozowich.com/photo10/'}
                                    excerpt={item.excerpt.rendered}
                                    choosePost={this.chooseBlog}
                                />
                            }
                        />

                    </View>
                )}
                { !this.state.blogLoaded && (
                    <View style={{ paddingTop: 30}}>
                        <Text> LOADING </Text>
                    </View>
                )}
            </View>
        );
    }

}

export class BlogItem extends React.Component {

    blogChoice=()=>{
        this.props.choosePost(this.props.id)
    }

    render() {
        let blogItems = `
        <a href=${this.props.id} style="textDecorationLine: none; color: #000000; textAlign: center">
            <img src=${this.props.imageSrc} />
            <h1 >${this.props.title}</h1>
            ${this.props.excerpt}
        </a>

        `;
        return (
            <View style={{borderBottomWidth: 2, borderBottomColor: '#000000', borderStyle:'solid' }}>
                <HTML html={blogItems} onLinkPress={()=> this.blogChoice()}/>
            </View>
        );
    }
}
