import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View,Dimensions,Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Home from "../Home/Home";

const Drawer = createDrawerNavigator();
const CustomDrawer = (props) => {
    //for width
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  //for height
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  
    const navigation = useNavigation();
    const handleLogout = () => {
      clearasyncStorage();
      navigation.navigate("index");
    };
    const [userId,setuserId]=useState(0);
    const [fullName,setfullName]=useState(null);
    const [emailId, setemailId] = useState(null);
    const [compCoed, setcompCoed] = useState(null);
    global.fullNameUser="ADMIN";
  
    const clearasyncStorage =async ()=>
      {
        try 
        {
          await AsyncStorage.clear();
          console.log('You Logged out Successfully  ');
        }
        catch(e)
        {
          console.log(`Error While clear storage ${e}`);
        }
      };
  
    useEffect(() => 
      {
        //retrveSessionData();
      },[]);
  
     const retrveSessionData= async ()=>
     {
        const fullName=await AsyncStorage.getItem('fullName');
        const tempCompCode=await AsyncStorage.getItem('companyCode');
        if(fullName!=null)
        {
          await setfullName(fullName.toString());
          await setcompCoed(tempCompCode.toString());
          global.fullNameUser=fullName.toString();
        }
        else
        {
          setfullName(null);
          setcompCoed(null);
        }
  
        const emailId=await AsyncStorage.getItem('emailId');
        if(emailId!=null)
        {
          setemailId(emailId.toString());
        }
        else
        {
          setemailId(null);
        }
     }
  
    return (
      <View style={{flex:1,backgroundColor:'rgba(111,96,39,0.4)'}}>
        <DrawerContentScrollView {...props}>
          <View style={[styles.drwarHeaderMain,{marginTop:0}]}>
          <Image style={{ width: '100%', height: 130, borderRadius: 20,resizeMode: 'contain' }} source={require("../../../../assets/images/output-onlinepngtools (2).png")} />
          </View>
          <View style={{alignItems:'left',marginLeft:5}}>
            <Text style={{ fontFamily:'Poppins-Bold',color:'black' }}>{fullName}</Text>
          </View>
          <DrawerItemList {...props} />       
        </DrawerContentScrollView>
          <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
            <AntDesign name="logout" size={20} style={{fontFamily:'Poppins-Bold'}} color="black" />
            <Text style={{color:colors.greenBar,fontFamily:'Poppins-Bold',marginLeft:30}}>Log Out</Text>
          </TouchableOpacity>
      </View>
      
    );
  };
  

const DrawerNavigator = () => {

    //for width
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  //for height
  const SCREEN_HEIGHT = Dimensions.get('screen').height;

  const [clientName, setclientName] = useState(null);

  const retrveSessionData= async ()=>
    {
       const tempclientName=await AsyncStorage.getItem('clientName');
       if(tempclientName!=null)
       {
         setclientName(tempclientName.toString());
       }
       else
       {
         setclientName(null);
       }
    }

    useEffect(() => 
      {
        retrveSessionData();
      },[]);

  return (
   <Drawer.Navigator 
    screenOptions={{
        headerShown:true,
        headerStyle:{
          backgroundColor:'transparent',
          elevation:0,
          shadowOpacity:0
        },
        drawerStyle: {
                flex: 1,
                width: 300,
            },
    }} drawerContent={(props) => <CustomDrawer {...props} />} >
      <Drawer.Screen name="Home"  component={Home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: 'rgba(111,96,39,0.9)',
            height:40,
          },
          drawerIcon:() => (
            <FontAwesome name="home" size={20} color="black" />
          ),
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily:'Poppins-Bold',
            marginTop:(Platform.OS==="ios"?-70:-35),
            color:'white',
            alignItems:'center',
            verticalAlign:'middle',
            justifyContent:'center',
            alignContent:'center'
            //marginLeft:40
          },
          headerLeftContainerStyle:{
            marginTop:(Platform.OS==="ios"?-70:-35)
          }
          //headerShown:false
        }}

      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({
    appBarStyle: {
      backgroundColor: '#008276',
    },
    drwarHeaderMain: {
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      padding: 5, 
      alignItems: 'center',
      backgroundColor:colors.lightgreen,
      marginBottom:0,
      backgroundColor:'white',
      height:'65%',
      //marginTop:-45
    },
    drwaerFooterText:
    {
        position:'absolute',
        bottom:0
    },
    logOutButton:
    {
      position:'absolute',
      bottom:0,
      right:0,
      left:0,
      bottom:50,
      padding:25,
      flexDirection:'row'
      //backgroundColor:'#f6f6f6'
    }
  })