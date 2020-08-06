import { Alert } from "react-native";

export const messagingService = {
    confirm
}

function confirm(title: string, message: string, yesCallback?: () => void, noCallback?: () => void) {
    Alert.alert(
        title,
        message,
        [
            { text: 'Yes', onPress: yesCallback },
            { text: 'No', onPress: () => noCallback, style: 'cancel' }
        ],
        { cancelable: false },
    );
}


