import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

export default toroModal = (props) => {
  closeModal = () => {
    props.setModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}>
      <TouchableOpacity onPress={() => closeModal()}>
        <SafeAreaView>
          <View style={styles.modalView}>
            <Text style={styles.heading}>
              Sangria Cafe Loyalty Reward Program
            </Text>
            <Text style={[styles.bodyStyle, {marginBottom: 10}]}>
              With the Sangria Cafe's Rewards program, each purchase brings
              customers closer to free food and special offerings. To earn
              Sangria Cafe's loyalty Toros, you need to order using the Sangria
              Cafe offical app.
            </Text>
            {/* <Text style={[styles.heading, {margin: 5}]}>Titles & Rewards</Text> */}
            <Text style={styles.heading}>Ayuda</Text>
            <Text style={styles.bodyStyle}>
              The assistant. This is where a future Matador's training begins.
              As an assistant to the Mozo De Espada, you will learn the inner
              workings of Bullfighting.
            </Text>
            <Text style={styles.reward}>
              GENERAL THANK YOU FOR JOING REWARD
            </Text>
            <Text style={styles.heading}>Mozo De Espada</Text>
            <Text style={styles.bodyStyle}>
              The lad of the swords. The Ayuda has been promoted to equiptment
              director. The Mozo is essential to assuring that all ranks have
              the necessary equiptment for the Matador and their team to be
              safe.
            </Text>
            <Text style={styles.reward}>FIRST LEVEL REWARD: Free App?</Text>
            <Text style={styles.heading}>Banderillero</Text>
            <Text style={styles.bodyStyle}>
              The Flag-person. The first step on the field! Armed with colorful
              sticks with barbed tips, the Banderillero places sticks while
              running as close to the bull as possible. Skilled Banderilleros
              can even alter the bulls charging movements.
            </Text>
            <Text style={styles.reward}>LEVEL TWO REWARD: Free Entree?</Text>
            <Text style={styles.heading}>Picador</Text>
            <Text style={styles.bodyStyle}>
              The lancers. The preliminary fighter, the Picador challenges the
              bull on horseback in order to enrage the bull, lower its head, and
              get it ready for the main event.
            </Text>
            <Text style={styles.reward}>LEVEL THREE REWARD: $300 coupon</Text>
            <Text style={styles.heading}>Matador</Text>
            <Text style={styles.bodyStyle}>
              The Prize Fighter. Both and artist and athlete, you have acheived
              rock star status. Not only must you win the fight but you have to
              do it with style. Only the greats make it to this stage.
            </Text>
            <Text style={styles.reward}>FRIEND OF THE FAMILY REWARD</Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    </View>
  );
};

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: screen.width,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyStyle: {
    justifyContent: 'flex-start',
  },
  reward: {
    color: 'tomato',
    marginBottom: 10,
  },
});
