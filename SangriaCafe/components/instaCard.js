import React, { useEffect, useState }from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';


export default Card = () => {

    const [posts, setPosts] = useState([])

    useEffect( () => {
        fetchFeed()
    }, [] )

    const fetchFeed = async () => {
        await fetch('https://graph.instagram.com/me/media?fields=id,caption,children,media_url&access_token=IGQVJXNVRIbDltaGU3ZAldSVHdnQ1lKcFBENDhxQ0N0RUg1LXZAQb1hPMEwzWkp3V0hrYjdXeGxkQUtKVEd2WGwwV3MxbXBoOFB1WXNEbVFqdzJrQzhtSUlXWXZAMS0hLQW9DU1FWLWRIMXlVa010SncxTwZDZD')
            .then(resp => resp.json())
            .then( data => setPosts(data.data) )
    }
    
    return (
        <>
        <ScrollView showsHorizontalScrollIndicator={false} centerContent={true} horizontal={true} contentInset={{top: 0, left: 0, bottom: 90, right: 0}}>
            {posts.map( post => {
                return (
                    <View key={post.id} style={styles.cardContent}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{margin: 10}}>
                            <Image source={{uri: post.media_url}} style={styles.picture} />
                        </View>
                        <View style={{margin: 8}}>
                            <Text>{post.caption}</Text>
                        </View>
                        </ScrollView>
                    </View>
                )
            })}
        </ScrollView>
        </>
    )
    
}

const styles = StyleSheet.create({
    cardContent: {
        alignItems: 'center',
        borderRadius: 10,
        width: 330,
        height: 400,
        flex: 1,
        margin: 10,
        padding: 5,
        elevation: 10,
        shadowOffset: {width: 20, height: 25},
        shadowColor: 'black',
        backgroundColor: 'white'
    },
    picture: {
        width: 300,
        height: 275,
        resizeMode: 'stretch',
        borderRadius: 5
    },
})