import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';
const pkg=require('../../../../package.json');

const Footer = () => {
    const appVersion=pkg.version;
    const [clientName, setclientName] = useState("Jara");
    const [userName, setUserName] = useState("Parmod Kumar");
    const [compCoed, setcompCoed] = useState("C0001");

  return (
    <>
    <View style={styles.containerfooter}>
        <View style={{flex:0.6,flexDirection:'row'}}>
        <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', flex: 1, textAlign: "left", paddingLeft: 5, fontSize: 12 }}>{clientName}</Text>
        <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', flex: 1, textAlign: "right", paddingRight: 3, fontSize: 12 }} numberOfLines={1}>{compCoed}</Text>
        </View>
        <View style={{flex:0.7,flexDirection:'row'}}>
          <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', flex: 1, textAlign: "left", paddingLeft: 5, fontSize: 12 }}>Sahu Exports ({appVersion})</Text>
          <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', flex: 1, textAlign: "right", paddingRight: 3, fontSize: 12 }} numberOfLines={1}>{userName}</Text>
        </View>
        <StatusBar style="light" />
      </View>
    </>
  )
}

export default Footer

const styles = StyleSheet.create({
    containerfooter: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor: 'rgba(111,96,39,0.9)'
      },
})