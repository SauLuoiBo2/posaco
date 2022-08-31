import logger from '@src/utils/common/logger';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
logger.debug('width', width, height);
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size) => (shortDimension / guidelineBaseWidth) * size;
const vScale = (size) => (longDimension / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, vScale, moderateScale };
