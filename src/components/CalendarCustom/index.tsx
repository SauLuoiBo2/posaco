import { StyleSheet } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Box, HStack, Text, useTheme } from 'native-base';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { getDaysInMonth, themes } from '@src/utils';
import { Menu, MenuItem } from 'react-native-material-menu';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import logger from '@src/utils/common/logger';
import moment from 'moment';
import _ from 'lodash';
import { shadow } from 'styled-system';

import { scale, vScale } from '../ScaleSheet';
import Touchable from '../Touchable';
import { Icon } from '../Icon';
import PickDate from '../PickDate';
import ButtonCustom from '../Button';

type PropsMenu = {
    typeCalendar: string;
    setTypeCalendar: any;
};

type PropsCustomCalendar = {
    onClose: () => void;
};

LocaleConfig.locales.en = {
    monthNames: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ],
    monthNamesShort: [
        'Thg 1',
        'Thg 2',
        'Thg 3',
        'Thg 4',
        'Thg 5',
        'Thg 6',
        'Thg 7',
        'Thg 8',
        'Thg 9',
        'Thg 10',
        'Thg 11',
        'Thg 12',
    ],
    dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'en';

const THEME_CALENDAR: any = {
    textSectionTitleColor: themes.colors.darkNeu,
    arrowColor: themes.colors.arrowCalendar,
    dayTextColor: themes.colors.black,
    monthTextColor: themes.colors.dark,
    todayTextColor: themes.colors.dark,
    textDayFontWeight: '400',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: 'bold',
    textDayFontSize: 14,
    textDayHeaderFontSize: 12,
    textMonthFontSize: 14,

    'stylesheet.day.basic': {
        base: {
            height: scale(28),
            width: scale(28),
            alignItems: 'center',
        },
    },
    'stylesheet.calendar.header': {
        arrow: {
            backgroundColor: themes.colors.lightGrey,
            width: scale(25),
            height: scale(25),
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        arrowImage: {
            width: scale(8),
            height: scale(8),
            tintColor: themes.colors.arrowCalendar,
        },
        week: {
            borderColor: themes.colors.borderDash,
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: vScale(8),
            paddingBottom: vScale(7),
        },
    },
};

const itemsMeunu = ['Tuần', 'Tháng'];

const MenuCalendar = ({ typeCalendar, setTypeCalendar }: PropsMenu) => {
    const { colors, fonts } = useTheme();
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    return (
        <Menu
            visible={visible}
            anchor={
                <Touchable style={styles.inputMonth} onPress={showMenu}>
                    <HStack alignItems='center' justifyContent='space-between'>
                        <Text>{typeCalendar}</Text>
                        <Icon name='arrow-down' color={colors.blue} size={15} ml />
                    </HStack>
                </Touchable>
            }
            onRequestClose={hideMenu}
        >
            {itemsMeunu.map((value, index) => (
                <MenuItem
                    key={index}
                    style={styles.inputMonthText}
                    onPress={() => {
                        setTypeCalendar(value);
                        hideMenu();
                    }}
                >
                    <Text fontSize='14px' fontFamily={fonts.hMedium}>
                        {value}
                    </Text>
                </MenuItem>
            ))}
        </Menu>
    );
};

const WEEKEND_DAYS = ['Sunday'];

const CalendarCustom = ({ onClose }: PropsCustomCalendar, ref: any) => {
    const { colors, fonts } = useTheme();
    const [typeCalendar, setTypeCalendar] = useState('Tháng');
    const [startDay, setStartDay] = useState({});
    const [periodDay, setPeriodDay] = useState({});
    const [markedDatesWeekend, setMarkedDatesWeekend] = useState(
        getDaysInMonth(moment().month(), moment().year(), WEEKEND_DAYS)
    );

    const BSRef = useRef<any>();

    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);

    useImperativeHandle(
        ref,
        () => ({
            getStartDate: () => startDate,
            getEndDate: () => endDate,
            open: () => BSRef.current.open(),
        }),
        [startDate, endDate]
    );

    const getPeriod = (startTimestamp: number, endTimestamp: number) => {
        const period: any = {};
        let start = moment.unix(startTimestamp);
        const end = moment.unix(endTimestamp);
        while (end.isAfter(start)) {
            period[start.format('YYYY-MM-DD')] = {
                customStyles: {
                    container: moment(start).unix() === startTimestamp ? styles.contentStartDate : {},
                    text: moment(start).unix() === startTimestamp ? styles.textStartDate : styles.textInRange,
                },
                startingDay: moment(start).unix() === startTimestamp,
            };
            start = start.add(1, 'days');
        }

        period[end.format('YYYY-MM-DD')] = {
            customStyles: {
                container: styles.contentEndDate,
                text: styles.textEndDate,
            },
            endingDay: true,
        };

        return period;
    };

    const setDay = useCallback(
        (objDate) => {
            const { dateString } = objDate;
            const timestamp = moment(dateString).unix();
            logger.debug('check', _.isEmpty(startDay));
            if (_.isEmpty(startDay)) {
                logger.debug('case 1', null);
                const period = {
                    [dateString]: {
                        selected: true,
                        disableTouchEvent: true,
                        customStyles: {
                            container: styles.contentStartDate,
                            text: styles.textStartDate,
                        },
                        endingDay: true,
                        startingDay: true,
                    },
                };
                const newObjDate = { ...objDate, timestamp };
                setStartDay(newObjDate);
                setPeriodDay(period);
                return;
            }

            const { timestamp: savedTimestamp }: any = startDay;

            if (savedTimestamp > timestamp) {
                // logger.debug('case 2', null);
                setStartDay({ ...objDate, timestamp });
                const period = getPeriod(timestamp, savedTimestamp);
                setPeriodDay(period);
            } else {
                logger.debug('case 3', null);
                const period = getPeriod(savedTimestamp, timestamp);
                setPeriodDay(period);
            }
        },
        [startDay]
    );

    const onMonthChange = (month: { month: number; year: number }) =>
        setMarkedDatesWeekend(getDaysInMonth(month.month - 1, month.year, WEEKEND_DAYS));

    useEffect(() => {
        if (!_.isEmpty(periodDay)) {
            setStartDate(moment(Object.keys(periodDay)[0]).unix());
            setEndDate(moment(Object.keys(periodDay)[Object.keys(periodDay).length - 1]).unix());
        }
    }, [periodDay]);

    return (
        <BottomSheet
            openDuration={250}
            height={vScale(500)}
            onClose={onClose}
            // mt={ }
            // closeOnDragDown={true}
            // dragFromTopOnly={true}
            // closeOnPressMask={false}
            ref={BSRef}
            customStyles={{
                container: styles.containerSheet,
                // draggableIcon: styles.draggableIcon,
            }}
        >
            <Box flex={1} pt='16px'>
                <Text
                    fontSize='18px'
                    color={colors.black}
                    fontWeight='bold'
                    fontFamily={fonts.hBold}
                    ml={`${scale(16)}px`}
                >
                    Bộ lọc
                </Text>
                <HStack px={`${scale(16)}px`} justifyContent='space-between'>
                    <MenuCalendar typeCalendar={typeCalendar} setTypeCalendar={setTypeCalendar} />
                    <Box>
                        <PickDate
                            showIcon={false}
                            startDate={startDate}
                            endDate={endDate}
                            styleDate={styles.styleDate}
                        />
                    </Box>
                </HStack>
                <Box style={styles.shadow}>
                    <Calendar
                        markingType='custom'
                        theme={THEME_CALENDAR}
                        style={styles.calendar}
                        firstDay={1}
                        // firstDay={1}
                        onDayPress={setDay}
                        onMonthChange={onMonthChange}
                        markedDates={{ ...markedDatesWeekend, ...periodDay }}
                    />
                </Box>
                <Box px={`${scale(16)}px`} mt={`${vScale(16)}px`}>
                    <ButtonCustom title='Áp dụng bộ lọc' h={`${vScale(48)}px`} onPress={() => BSRef.current.close()} />
                </Box>
            </Box>
        </BottomSheet>
    );
};

export default React.memo(forwardRef(CalendarCustom));

const styles = StyleSheet.create({
    calendar: {
        marginBottom: scale(10),
        height: 'auto',
        width: '100%',
    },
    shadow: {
        shadowRadius: 9,
        shadowOpacity: 0.1,
        elevation: 10,
        shadowOffset: {
            width: 0,
            height: vScale(4),
        },
    },
    inputMonth: {
        borderWidth: 1,
        width: scale(110),
        height: vScale(40),
        // alignItems: 'center',
        // flexDirection: 'row',
        borderColor: themes.colors.blue,
        paddingHorizontal: scale(16),
        justifyContent: 'center',
        marginVertical: vScale(10),
    },
    inputMonthText: {
        // height: vScale(45),
        // minWidth: scale(90),
        // paddingHorizontal: scale(16),
        // paddingTop: vScale(16),
    },

    textInRange: {
        color: themes.colors.blue,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    containerSheet: {
        borderRadius: 10,
    },
    styleDate: {
        // alignSelf: 'flex-end',
        width: scale(228),
        borderWidth: 1,
        height: vScale(40),
        paddingLeft: scale(4),
        paddingRight: scale(4),
        borderColor: themes.colors.blue,
    },

    contentStartDate: {
        backgroundColor: themes.colors.blue,
        borderRadius: vScale(16),
    },
    textStartDate: {
        color: themes.colors.white,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    textEndDate: {
        color: themes.colors.blue,
        textAlignVertical: 'center',
    },
    // weekendStyle: {
    //     color: themes.colors.red94,
    // },
    contentEndDate: {
        backgroundColor: themes.colors.white1,
        borderRadius: vScale(16),
    },
});
