import React from 'react';
import { ActivityIndicator, StyleProp, TextStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import { Center, useTheme } from 'native-base';

type Props = {
  color?: string;
  style?: StyleProp<TextStyle>;
  progress?: boolean;
  size?: string;
};

const Loading = ({ progress = true, size = 'small', color, style }: Props) => {
  const { colors: Colors } = useTheme();

  const colors = color ? color : Colors.blue;
  return (
    <Center>
      {progress ? (
        <Progress.CircleSnail
          size={28}
          color={color}
          thickness={2}
          strokeCap={'square'}
        />
      ) : (
        <ActivityIndicator size={'small'} color={colors} style={style} />
      )}
    </Center>
  );
};

export default Loading;
