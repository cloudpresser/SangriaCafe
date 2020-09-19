import React from 'react'
import App from './App'
import firebase from '@react-native-firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA',
    webClientId: '256081369777-fsgdf80ojpi67pkj2pbv3o1coa7c6h55.apps.googleusercontent.com',
    authDomain: 'sangriacafe.firebaseapp.com',
    databaseURL: 'https://sangriacafe.firebaseio.com',
    projectId: 'sangriacafe',
    storageBucket: 'sangriacafe.appspot.com',
    appId: '1:256081369777:ios:2df817ec6b031c17ea2090',
    offlineAccess: true,
    forceCodeForRefreshToken: true
}

const instaToken = 'IGQVJXNVRIbDltaGU3ZAldSVHdnQ1lKcFBENDhxQ0N0RUg1LXZAQb1hPMEwzWkp3V0hrYjdXeGxkQUtKVEd2WGwwV3MxbXBoOFB1WXNEbVFqdzJrQzhtSUlXWXZAMS0hLQW9DU1FWLWRIMXlVa010SncxTwZDZD'

const mapApi = 'AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA'

const postHeaders = {
    'Content-Type': "application/json",
    'ISV-ID':"???",
    'ISV-Key':"???",
    'App-Key':"???",
    'App-Version':"???",
    'Store-Sub-ID':"???"
}

const sandboxHeaders = {
    'Content-Type':"application/json",
    'ISV-ID':"D-181207-0001",
    'ISV-Key':"480a31cb-03e6-4718-9e16-2d7a27e7af8f",
    'App-Key':"6eeeccfb-dd19-41a3-b2fa-a15586c23e64",
    'App-Version':"1.0.0.0",
    'Store-Sub-ID':"2296-1C2A"
}

const requestGetOptions = {
    method: 'GET',
    headers: sandboxHeaders,
    redirect: 'follow'
}

const requestPOSTOptions = {
    method: 'POST',
    headers: sandboxHeaders,
    body: postOrderBody,
    redirect: 'follow'
}

const postOrderBody = {
    "EmployeeID": 1000000000000000001, // bigint, not null
	"OrderType": 1, // int, not null 3=TakeOut, 5=Delivery
    "GuestCount": 1, // int, not null, 1 ~ 99
	"CustomerName": null, // string, null, up to 100 char, CustomerName for customer
	"Telephone": null, // string, null, up to 20 char, numbers and dash '-' only, valid formats: ###-###-####, ########, Telephone for customer
    "Email": null, // string, null, up to 100 char, Email for customer
	"Address": null, // string, null, up to 100 char, address for customer
	"PostalCode": null, // string, null, up to 10 char, PostalCode for customer
	"City": 'Bronx', // string, null, up to 80 char, City for PostalCode
    "State": 'New York', // string, null, up to 20 char, State for PostalCode
    "CustomerPickupName": null, // string, null, up to 100 char
    "OrderSurchargeID": null,  // bigint, null
    "DeliveryCharge": null, // float, null, delivery charge assessed to customer for this order
    "OrderGratuityPercent": 15.00, // float, null, order gratuity applied toward this order
    "OrderNote": null, // string, null, up to 40 char, order level note or comment
    "AutoPrint": true, // bool, if true = order will auto print to kitchen but a notification is sent; if false = order will not auto print to kitchen
    "SystemPrint": false, // bool, if true = order will print to kitchen based on pos config AutoPrintNonPaidISVOrdersToKitchen; if false = order will not print to kitchen
    "OrderDetails": [
        {
          "ItemID": 1000000000000000346, // bigint, not null
          "Qty": 1.000, // float, not null, only weighted item can have fractions, 3 decimal places for weighted item, non weighted item must be integer
          "UnitPrice": 6, // float, null
          "LineNote": null, // string, null, up to 100 char
          "CreatedByEmployeeID": 1000000000000000001, // bigint, not null, order detail created by this employee
        },
    ]
}

const postFetch = () => {
    fetch("https://sandbox.aldelo.io/v1/boarding/connected/20181202/20181203", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
}

export {firebaseConfig, instaToken, mapApi, postFetch, postOrderBody}

const Setup = () => {
    {firebase.initializeApp(firebaseConfig)}
    return <App/>
}

export default Setup