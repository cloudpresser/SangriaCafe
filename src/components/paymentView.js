import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

export default PaymentView = () => {

    const htmlContent = `
        <h1>Card Page</h1>
    `;

    const injectedJavaScript = `(function(){
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

    const onMessage = (event) => {
        const { data } = event.nativeEvent;
        console.log(data)
    }

    return (
        <WebView
            javaScriptEnabled={true}
            style={{ flex: 1 }}
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            injectedJavaScript={injectedJavaScript}
            onMessage={onMessage}
        />
    )
}