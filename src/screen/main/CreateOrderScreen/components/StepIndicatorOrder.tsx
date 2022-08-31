import StepIndicator from 'react-native-step-indicator';
import React from 'react';
import { Box, useTheme, Text } from 'native-base';
import { Icon } from '@src/components';

const labels = ['Sản phẩm', 'Vận chuyển', 'Thông tin'];

interface Props {
    currentStepp: number;
    [key: string]: any;
}

const StepIndicatorOrder = ({ currentStepp = 0, ...props }: Props) => {
    const { colors } = useTheme();

    const customStyles = {
        stepIndicatorSize: 48,
        currentStepIndicatorSize: 48,
        separatorStrokeWidth: 1,
        currentStepStrokeWidth: 0,
        separatorFinishedColor: colors.green,
        separatorUnFinishedColor: colors.darkNeu,
        labelColor: colors.darkNeu,
        labelSize: 14,
        currentStepLabelColor: colors.green,
    };

    return (
        <Box {...props}>
            <StepIndicator
                stepCount={3}
                customStyles={customStyles}
                currentPosition={currentStepp}
                labels={labels}
                renderStepIndicator={({ position, stepStatus }) => {
                    let iconName;
                    let size = 17;
                    switch (position) {
                        case 0:
                            iconName = 'box-fill';
                            size = 20;
                            break;
                        case 1:
                            iconName = 'delivery';
                            size = 20;
                            break;
                        case 2:
                            iconName = 'infor';
                            size = 20;
                            break;
                        default:
                            break;
                    }
                    return (
                        <Box
                            bg={stepStatus === 'unfinished' ? colors.light : colors.green}
                            w='48px'
                            h='48px'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Icon
                                name={iconName}
                                size={size}
                                color={stepStatus === 'unfinished' ? colors.darkNeu : colors.white}
                            />
                        </Box>
                    );
                }}
                renderLabel={({ label, stepStatus }) => (
                    <Box mt='6px'>
                        <Text color={stepStatus === 'unfinished' ? colors.darkNeu : colors.green}>{label}</Text>
                    </Box>
                )}
            />
        </Box>
    );
};

export default React.memo(StepIndicatorOrder);
