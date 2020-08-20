import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import styled from 'styled-components/native';
//const Realm = require('realm');

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

// export function HomeScreen({ navigation }) {

//     //const [realm, setRealm] = useState()

//     // useEffect(() => {
//     //     Realm.open({
//     //         schema: [{ name: 'Dog', properties: { name: 'string' } }]
//     //     }).then(realm => {
//     //         realm.write(() => {
//     //             realm.create('Dog', { name: 'Rex' });
//     //         });
//     //         setRealm(realm);
//     //     });

//     //     () => {
//     //         if (realm !== null && !realm.isClosed) {
//     //             realm.close();
//     //         }
//     //     }
//     // }, [])

//     // const info = realm
//     //     ? 'Number of dogs in this Realm: ' + realm.objects('Dog').length
//     //     : 'Loading...';

//     return <StyledView>
//         <Text>This is Home</Text>
//         {/* <Text> {info}</Text> */}
//         <Button onPress={() => navigation.navigate('Reports')} title="Reports" />
//     </StyledView>
// }

export function SettingsScreen() {
    return <StyledView>
        <Text>This is Settings</Text>
    </StyledView>
}


export function ReportsScreen() {
    return <StyledView>
        <Text>This is Reports</Text>
    </StyledView>
}

export function SplashScreen() {
    return <View>
        <Text>This is Reports</Text>
    </View>
}