import React, { useState } from 'react'
import { Button, Modal, SafeAreaView, StyleSheet, View, Image, Dimensions, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import Menu from '../components/menu'

const Order = props => {
    const [modalVisible, setModalVisible] = useState(false)
    const [value, onChangeText] = useState('0');

    const handleItemSelect = item => {
        setModalVisible(true)
    }

    return (
        <>
        <SafeAreaView>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
            <View>
                <View style={styles.modalView}>
                <View style={styles.modalMenuItems}>
                    <View>
                        <Image source={require('../assets/toro_front.jpg')} style={styles.modalMenuItemImage} />
                    </View>
                    <View style={styles.modalDescription}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Cheese</Text>
                        <Text style={{color: 'white'}}>SOME NUTS AND STUFF</Text>
                    </View>
                    <View style={styles.modalToroContainer}>
                        <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                        <Text style={{fontSize:16}}>200</Text>
                    </View>
                </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>How Many?  </Text>
                        <TextInput keyboardType='number-pad' value={value} onChangeText={onChangeText} style={{width: 25, alignSelf: 'center'}}/>
                        <Button title='Add to Cart' onPress={() => console.log('food')}/>
                    </View>
                    <TouchableOpacity onPress={() => {setModalVisible(false)}}>
                        <Image source={{uri: 'https://www.freeiconspng.com/thumbs/close-button-png/black-circle-close-button-png-5.png'}} style={{height: 15, width: 15, alignSelf: 'flex-end'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <View style={styles.topContainer}>
            <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
        </View>

        <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} contentInset={{top: 0, left: 0, bottom: 110, right: 0}} >
            
            <View style={styles.card}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>APPERTIVOS</Text>
            <View style={styles.cardContent}>

            {Menu[0].appetizers.items.map( food => {
                return (
                <TouchableOpacity onPress={() => {handleItemSelect(food)}}>
                    <View style={styles.menuItems}>
                        <View style={styles.menuItemImageContainer}>
                            <Image source={{uri : food.details.image}} style={styles.menuItemImage} />
                        </View>
                        <View style={styles.menuItemDescription}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{food.name}</Text>
                            <Text style={{color: 'white'}}>{food.details.description}</Text>
                        </View>
                        <View style={styles.toroContainer}>
                            <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                            <Text style={{fontSize:16}}>{food.details.toros}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                )
            })}
            </View>
            </View>

            <View style={styles.card}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>PLATOS FUERTES</Text>
            <View style={styles.cardContent}>

            {Menu[1].mainCourses.items.map( food => {
                return (
                <TouchableOpacity onPress={() => {handleItemSelect(food)}}>
                    <View style={styles.menuItems}>
                        <View style={styles.menuItemImageContainer}>
                            <Image source={{uri : food.details.image}} style={styles.menuItemImage} />
                        </View>
                        <View style={styles.menuItemDescription}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{food.name}</Text>
                            <Text style={{color: 'white'}}>{food.details.description}</Text>
                        </View>
                        <View style={styles.toroContainer}>
                            <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                            <Text style={{fontSize:16}}>{food.details.toros}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                )
            })}
            </View>
            </View>
            
            <View style={styles.card}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>PLATOS FUERTES</Text>
            <View style={styles.cardContent}>

            {Menu[2].steaks.items.map( food => {
                return (
                <TouchableOpacity onPress={() => {handleItemSelect(food)}}>
                    <View style={styles.menuItems}>
                        <View style={styles.menuItemImageContainer}>
                            <Image source={{uri : food.details.image}} style={styles.menuItemImage} />
                        </View>
                        <View style={styles.menuItemDescription}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{food.name}</Text>
                            <Text style={{color: 'white'}}>{food.details.description}</Text>
                        </View>
                        <View style={styles.toroContainer}>
                            <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                            <Text style={{fontSize:16}}>{food.details.toros}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                )
            })}
            </View>
            </View>

            <View style={styles.card}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>PAELLA & ARROCES</Text>
            <View style={styles.cardContent}>

            {Menu[3].rices.items.map( food => {
                return (
                <TouchableOpacity onPress={() => {handleItemSelect(food)}}>
                    <View style={styles.menuItems}>
                        <View style={styles.menuItemImageContainer}>
                            <Image source={{uri : food.details.image}} style={styles.menuItemImage} />
                        </View>
                        <View style={styles.menuItemDescription}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{food.name}</Text>
                            <Text style={{color: 'white'}}>{food.details.description}</Text>
                        </View>
                        <View style={styles.toroContainer}>
                            <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                            <Text style={{fontSize:16}}>{food.details.toros}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                )
            })}
            </View>
            </View>

            <View style={styles.card}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>SANDWICHES</Text>
            <View style={styles.cardContent}>

            {Menu[4].sandwiches.items.map( food => {
                return (
                <TouchableOpacity onPress={() => {handleItemSelect(food)}}>
                    <View style={styles.menuItems}>
                        <View style={styles.menuItemImageContainer}>
                            <Image source={{uri : food.details.image}} style={styles.menuItemImage} />
                        </View>
                        <View style={styles.menuItemDescription}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{food.name}</Text>
                            <Text style={{color: 'white'}}>{food.details.description}</Text>
                        </View>
                        <View style={styles.toroContainer}>
                            <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                            <Text style={{fontSize:16}}>{food.details.toros}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                )
            })}
            </View>
            </View>

            <View style={styles.card}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>ENSALADAS</Text>
            <View style={styles.cardContent}>

            {Menu[5].salads.items.map( food => {
                return (
                <TouchableOpacity onPress={() => {handleItemSelect(food)}}>
                    <View style={styles.menuItems}>
                        <View style={styles.menuItemImageContainer}>
                            <Image source={{uri : food.details.image}} style={styles.menuItemImage} />
                        </View>
                        <View style={styles.menuItemDescription}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{food.name}</Text>
                            <Text style={{color: 'white'}}>{food.details.description}</Text>
                        </View>
                        <View style={styles.toroContainer}>
                            <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                            <Text style={{fontSize:16}}>{food.details.toros}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                )
            })}
            </View>
            </View>


        </ScrollView>
        </SafeAreaView>
        </>
    )
}

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
    topContainer: {
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 10
    },
      logo: {
        height: screen.width / 4,
        width: screen.width / 1.7,
    },
    card: {
        flex: 1,
        margin: 5,
        padding: 10
    },
    cardContent: {
        justifyContent: 'center'
    },
    menuItems: {
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 10,
        backgroundColor: 'tomato',
        shadowOffset: {width: 20, height: 25},
        shadowColor: 'black',
        margin: 2,
        padding: 2
    },
    menuItemImage: {
        height: 65,
        width: 65,
        borderRadius: 45
    },
    menuItemImageContainer: {
        justifyContent: 'center',
        margin: 5,
    },
    menuItemDescription: {
        margin: 8,
        width: '58%'
    },
    toroContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    modalView: {
        backgroundColor: "white",
        padding: 20,
        margin: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        }
    },
    modalMenuItems: {
        alignItems: 'center',
        backgroundColor: 'tomato',
        margin: 50,
        padding: 20,
        borderRadius: 5
    },
    modalDescription: {
        width: 300,
        margin: 15
    },
    modalMenuItemImage: {
        height: 250,
        width: 300,
        borderRadius: 5,
        margin: 15
    },
    modalToroContainer: {
        
    }
})

export default Order