import { Dimensions } from 'react-native';

export function scaleSize(fontSize) {
  const window = Dimensions.get('window');
  const scaleRatio = Math.round((fontSize / 375) * Math.min(window.width, window.height));
  return scaleRatio;
}  
