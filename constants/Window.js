import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default getWinSize()
{
    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({ window }) => {
                setDimensions({ window });
            },
        );
        return () => subscription?.remove();
    });

    return (window.width, window.height);
}