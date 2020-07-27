import React, { useEffect, useState }from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import Menu from '../components/menu'

export default Card = () => {

    const [posts, setPosts] = useState([])

    useEffect( () => {
        fetchFeed()
    }, [] )

    const fetchFeed = async () => {
        await fetch('https://graph.instagram.com/me/media?fields=username,id,caption,media_url&access_token=IGQVJXNVRIbDltaGU3ZAldSVHdnQ1lKcFBENDhxQ0N0RUg1LXZAQb1hPMEwzWkp3V0hrYjdXeGxkQUtKVEd2WGwwV3MxbXBoOFB1WXNEbVFqdzJrQzhtSUlXWXZAMS0hLQW9DU1FWLWRIMXlVa010SncxTwZDZD')
            .then(resp => resp.json())
            .then( data => setPosts(data.data) )
    }
    
    return (
        <>
        <ScrollView showsHorizontalScrollIndicator={false} centerContent={true} horizontal={true} contentInset={{top: 0, left: 0, bottom: 90, right: 0}}>
            {posts.map( post => {
                return (
                    <View key={post.id} style={styles.cardContent}>
                        <View style={styles.userNameBar}>
                            <Image source={require('../assets/sangria_logo.png')} style={{height: 20, width: 20, borderRadius: 15, margin: 5}}/>
                            <Text>sangriacafe</Text>
                        </View>
                        <View>
                            <Image source={{uri: post.media_url}} style={styles.picture} />
                        </View>
                            <ScrollView showsVerticalScrollIndicator={false}>
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
        borderRadius: 10,
        width: 330,
        height: 400,
        flex: 1,
        margin: 10,
        elevation: 10,
        shadowOffset: {width: 20, height: 25},
        shadowColor: 'black',
        backgroundColor: 'white'
    },
    picture: {
        width: 330,
        height: 285,
        resizeMode: 'stretch',
    },
    userNameBar : {
        justifyContent: 'flex-start',
        flexDirection: 'row', 
        alignItems: 'center', 
        margin: 5
    }
})