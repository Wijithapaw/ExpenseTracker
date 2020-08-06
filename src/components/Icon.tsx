import React from 'react'
import FaIcon from 'react-native-vector-icons/FontAwesome';

const MY_COMP_HIT_SLOP = { top: 5, left: 5, right: 5, bottom: 5 }

interface Props {
    name: string;
    onPress?: (e: any) => void;
    size?: number;
}

export default function Icon({ name, onPress, size }: Props) {
    return <FaIcon name={name} onPress={onPress} size={size || 15} />
}
