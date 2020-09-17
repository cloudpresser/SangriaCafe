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
	"OrderType": 1, // int, not null, 1=DineIn, 2=Bar, 3=TakeOut, 4=DriveThru, 5=Delivery, 6=Retail
    "GuestCount": 99, // int, not null, 1 ~ 99
	"SeatingID": null, // bigint, null
	"BarTabName": null, // string, null, up to 100 char, bar tab order type only
	"CustomerID": null, // bigint, null
	"CustomerName": null, // string, null, up to 100 char, CustomerName for customer
	"Telephone": null, // string, null, up to 20 char, numbers and dash '-' only, valid formats: ###-###-####, ########, Telephone for customer
    "Email": null, // string, null, up to 100 char, Email for customer
	"Address": null, // string, null, up to 100 char, address for customer
	"PostalCode": null, // string, null, up to 10 char, PostalCode for customer
	"City": null, // string, null, up to 80 char, City for PostalCode
    "State": null, // string, null, up to 20 char, State for PostalCode
    "CustomerPickupName": null, // string, null, up to 100 char
    "OrderDiscountID": null,  // [bigint] NULL
    "CashPromoEmployeeID": null, // bigint, null, a cash promotional discount applied by an employee, this field indicates the employee who applied it
    "CashPromoAmountApplied": null, // float, null, cash promotional discount applied to this order
    "OrderSurchargeID": null,  // bigint, null
    "DeliveryCharge": null, // float, null, delivery charge assessed to customer for this order
    "OrderGratuityPercent": 15.00, // float, null, order gratuity applied toward this order
    "CashGratuityAmountUsed": 5.00, // float, null, cash gratuity applied toward this order
    "OrderNote": null, // string, null, up to 40 char, order level note or comment
    "AutoPrint": false, // bool, if true = order will auto print to kitchen but a notification is sent; if false = order will not auto print to kitchen
    "SystemPrint": false, // bool, if true = order will print to kitchen based on pos config AutoPrintNonPaidISVOrdersToKitchen; if false = order will not print to kitchen
    "FutureDateHoldUntilTime": "2018-12-10 20:00", // datetime, null, Future Date Used Only, order is held until this date and time, format is yyyy-mm-dd hh:mm with hh in 24 hour notation
 
    "OrderDetails": [
        {
          "ItemID": 1000000000000000346, // bigint, not null
          "SeatNumber": null, // int, null
          "Qty": 1.000, // float, not null, only weighted item can have fractions, 3 decimal places for weighted item, non weighted item must be integer
          "UnitPrice": 6, // float, null
          "LineDiscountID": null, // bigint, null
          "LineNote": null, // string, null, up to 100 char
          "CreatedByEmployeeID": 1000000000000000001, // bigint, not null, order detail created by this employee
          "SameDateHoldUntilTime": "2018-12-10 20:00", // datetime, null, Same Date Hold Used Only, order item is held until this date and time, format is yyyy-mm-dd hh:mm with hh in 24 hour notation
        "OrderDetailModifiers": [
            {
              "ModifierID": 1000000000000000291, // bigint, not null
              "ModifierPrice":5, // float, null, modifier price to add on
              "PortionType": null, // int, null, valid values are: null or 0 means no portion type; 1 = for whole portion; 2 = for halves portion; 3 = for thirds portion (portion is used in pizza ordering)
              "PortionSection": null, // int, null, conditionally required if PortionType is 2 or 3; indicates portion section: 1=Whole, 2=FirstHalf, 3=SecondHalf, 4=FirstThirds, 5=SecondThirds, 6=ThirdThirds
              "ModifierType": 1, // int, null, null means 1, valid values are: null or 1 = for forced modifier; 2 = for advanced modifiers; 3 = for pizza modifier
              "ModifierGroupNumber": 1, // int, null, null means group 1, valid values 1 to 10
            }
        ]
        }
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