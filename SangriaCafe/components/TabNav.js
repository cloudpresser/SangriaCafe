import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default TabNav = () => {
    return(
        <View>
            <View style={styles.nav}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={require("../assets/home_icon.svg")}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={require("../assets/order_icon.svg")}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={require("../assets/profile_icon.svg")}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    icon: {
        height: 40,
        width: 40
    }
})