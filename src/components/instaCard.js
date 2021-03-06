import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {instaToken} from '../../Setup';

export default Card = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    await fetch(
      `https://graph.instagram.com/me/media?fields=username,id,caption,media_url&access_token=${instaToken}`,
    )
      .then((resp) => resp.json())
      .then((data) => setPosts(data.data));
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        centerContent={true}
        horizontal={true}
        contentInset={{top: 0, left: 0, bottom: 90, right: 0}}>
        {posts &&
          posts.map((post) => {
            return (
              <View key={post.id} style={styles.cardContent}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://www.instagram.com/sangriacafe/');
                  }}>
                  <View style={styles.userNameBar}>
                    <Image
                      source={{
                        uri:
                          'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Finsta_logo.jpg?alt=media&token=db344a72-d391-4577-9ebd-d82f209b0e3d',
                      }}
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 15,
                        margin: 5,
                      }}
                    />
                    <Text>sangriacafe</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <Image
                    source={{uri: post.media_url}}
                    style={styles.picture}
                  />
                  <Image
                    source={{
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fgrambottom.png?alt=media&token=741efa43-a316-4fc3-a51a-555dce122f57',
                    }}
                    style={{height: 18, width: 300}}
                  />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{margin: 10}}>
                    <Text>{post.caption}</Text>
                  </View>
                </ScrollView>
              </View>
            );
          })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    borderRadius: 10,
    width: 300,
    height: 380,
    flex: 1,
    margin: 5,
    elevation: 10,
    shadowOffset: {width: 20, height: 25},
    shadowColor: 'black',
    backgroundColor: 'white',
  },
  picture: {
    width: 300,
    height: 240,
    resizeMode: 'stretch',
  },
  userNameBar: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
});
