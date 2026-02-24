import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../constants/colors';
import API from '../constants/api';
import { ChevronLeft, Calendar as CalendarIcon, Clock } from 'lucide-react-native';

const doctors = ["Dr. Ahmed Ali", "Dr. Sarah Khan", "Dr. John Doe", "Dr. Maria Garcia"];
const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

// Generate next 7 days
const getNext7Days = () => {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        days.push({
            label: i === 0 ? 'Today' : dayNames[d.getDay()],
            date: d.getDate(),
            month: monthNames[d.getMonth()],
            full: d.toISOString().split('T')[0], // YYYY-MM-DD
        });
    }
    return days;
};

const next7Days = getNext7Days();

export default function BookAppointment({ navigation }) {
    const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
    const [selectedDay, setSelectedDay] = useState(next7Days[0]);
    const [selectedTime, setSelectedTime] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);

    React.useEffect(() => {
        const fetchBookedSlots = async () => {
            try {
                const res = await API.get(`/appointments/booked-slots?doctorName=${selectedDoctor}&date=${selectedDay.full}`);
                setBookedSlots(res.data);
                if (res.data.includes(selectedTime)) setSelectedTime('');
            } catch (err) {
                console.log('Error fetching booked slots', err);
            }
        };
        fetchBookedSlots();
    }, [selectedDoctor, selectedDay]);

    const handleBooking = async () => {
        if (!selectedTime) return Alert.alert('Error', 'Please select a time slot');
        try {
            await API.post('/appointments/book', {
                doctorName: selectedDoctor,
                date: selectedDay.full,
                time: selectedTime
            });
            Alert.alert('✅ Booking Confirmed!', `Appointment booked with ${selectedDoctor} on ${selectedDay.date} ${selectedDay.month} at ${selectedTime}`, [
                {
                    text: 'View Schedule',
                    onPress: () => {
                        // Navigate back to Main tabs then go to Schedule tab
                        navigation.navigate('Main', { screen: 'Schedule' });
                    }
                }
            ]);
        } catch (err) {
            Alert.alert('Booking Failed', err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={30} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Book Appointment</Text>
            </View>

            <Text style={styles.label}>Select Doctor</Text>
            <View style={styles.doctorGrid}>
                {doctors.map(doc => (
                    <TouchableOpacity
                        key={doc}
                        style={[styles.docCard, selectedDoctor === doc && styles.activeDoc]}
                        onPress={() => setSelectedDoctor(doc)}
                    >
                        <View style={styles.docAvatar}><Text style={styles.avatarText}>{doc[4]}</Text></View>
                        <Text style={[styles.docName, selectedDoctor === doc && styles.activeText]}>{doc}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                {next7Days.map((day) => (
                    <TouchableOpacity
                        key={day.full}
                        style={[styles.dayCard, selectedDay.full === day.full && styles.activeDayCard]}
                        onPress={() => setSelectedDay(day)}
                    >
                        <Text style={[styles.dayLabel, selectedDay.full === day.full && styles.activeDayText]}>{day.label}</Text>
                        <Text style={[styles.dayNum, selectedDay.full === day.full && styles.activeDayText]}>{day.date}</Text>
                        <Text style={[styles.dayMonth, selectedDay.full === day.full && styles.activeDayText]}>{day.month}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Text style={styles.label}>Available Time Slots</Text>
            <View style={styles.timeGrid}>
                {timeSlots.map(slot => {
                    const isBooked = bookedSlots.includes(slot);
                    return (
                        <TouchableOpacity
                            key={slot}
                            style={[
                                styles.timeBtn,
                                selectedTime === slot && styles.activeTime,
                                isBooked && styles.bookedTime
                            ]}
                            onPress={() => !isBooked && setSelectedTime(slot)}
                        >
                            <Text style={[
                                styles.timeText,
                                selectedTime === slot && styles.activeText,
                                isBooked && styles.bookedText
                            ]}>{slot}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity style={styles.bookBtn} onPress={handleBooking}>
                <Text style={styles.bookBtnText}>Confirm Booking</Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white, padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 30 },
    title: { fontSize: 24, fontWeight: 'bold', color: colors.textPrimary, marginLeft: 15 },
    label: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 15, marginTop: 10 },
    doctorGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    docCard: { width: '48%', backgroundColor: colors.secondary, borderRadius: 15, padding: 15, alignItems: 'center', marginBottom: 15 },
    activeDoc: { backgroundColor: colors.primaryDark },
    docAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    avatarText: { fontSize: 20, fontWeight: 'bold', color: colors.primaryDark },
    docName: { fontWeight: '600', textAlign: 'center', color: colors.textPrimary },
    activeText: { color: colors.white },
    // Date scroll styles
    dateScroll: { marginBottom: 15 },
    dayCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginRight: 10,
        minWidth: 64,
    },
    activeDayCard: { backgroundColor: colors.primaryDark },
    dayLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, marginBottom: 4 },
    dayNum: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary },
    dayMonth: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    activeDayText: { color: colors.white },
    // Time grid styles
    timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    timeBtn: { width: '30%', paddingVertical: 12, backgroundColor: colors.secondary, borderRadius: 10, alignItems: 'center' },
    activeTime: { backgroundColor: colors.primaryDark },
    bookedTime: { backgroundColor: '#e0e0e0', opacity: 0.5 },
    timeText: { fontWeight: '600', color: colors.textPrimary },
    bookedText: { color: '#9e9e9e', textDecorationLine: 'line-through' },
    bookBtn: { height: 55, backgroundColor: colors.primaryDark, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 40, elevation: 3 },
    bookBtnText: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
});
