import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { colors } from '../constants/colors';
import { Activity, Heart, Footprints, Moon, Plus } from 'lucide-react-native';
import API from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [userName, setUserName] = useState('Sarah');
    const [upcoming, setUpcoming] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) setUserName(JSON.parse(user).name);

            const res = await API.get('/appointments/upcoming');
            if (res.data.length > 0) setUpcoming(res.data[0]);
        } catch (err) {
            console.log('Fetch Home failed', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData().finally(() => setRefreshing(false));
    };

    const StatCard = ({ icon: Icon, label, value, unit, color }) => (
        <View style={styles.statCard}>
            <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
                <Icon size={24} color={color} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statUnit}>{unit}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello,</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
                <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.profileInitials}>{userName[0]}</Text>
                </TouchableOpacity>
            </View>

            {/* Upcoming Appointment Card */}
            <View style={styles.upcomingCard}>
                <View style={styles.upcomingHeader}>
                    <Text style={styles.upcomingTitle}>Upcoming Appointment</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                {upcoming ? (
                    <View style={styles.appointmentRow}>
                        <View style={styles.doctorCircle}>
                            <Text style={styles.doctorInitial}>{upcoming.doctorName[0]}</Text>
                        </View>
                        <View style={styles.appointmentInfo}>
                            <Text style={styles.doctorName}>Dr. {upcoming.doctorName}</Text>
                            <Text style={styles.appointmentTime}>{upcoming.date} • {upcoming.time}</Text>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.noUpcoming}>No upcoming appointments</Text>
                )}
            </View>

            <View style={styles.grid}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('BookAppointment')}>
                    <Plus color={colors.primaryDark} size={30} />
                    <Text style={styles.actionText}>Book New</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Records')}>
                    <Activity color={colors.primaryDark} size={30} />
                    <Text style={styles.actionText}>Records</Text>
                </TouchableOpacity>
            </View>

            {/* Health Stats */}
            <Text style={styles.sectionTitle}>Health Statistics</Text>
            <View style={styles.statsRow}>
                <StatCard icon={Heart} label="Heart Rate" value="98" unit="bpm" color="#FF5252" />
                <StatCard icon={Activity} label="Blood Pressure" value="120/80" unit="mmHg" color="#448AFF" />
            </View>
            <View style={styles.statsRow}>
                <StatCard icon={Footprints} label="Steps" value="6,450" unit="steps" color="#4CAF50" />
                <StatCard icon={Moon} label="Sleep" value="7.5" unit="hours" color="#7E57C2" />
            </View>
            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30 },
    greeting: { fontSize: 18, color: colors.textSecondary },
    userName: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary },
    profileBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
    profileInitials: { fontSize: 20, fontWeight: 'bold', color: colors.primaryDark },
    upcomingCard: { backgroundColor: colors.primaryDark, borderRadius: 20, padding: 20, marginBottom: 25 },
    upcomingHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    upcomingTitle: { color: colors.white, fontSize: 16, fontWeight: '600', opacity: 0.9 },
    seeAll: { color: colors.white, fontSize: 14, fontWeight: 'bold' },
    appointmentRow: { flexDirection: 'row', alignItems: 'center' },
    doctorCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
    doctorInitial: { color: colors.white, fontSize: 22, fontWeight: 'bold' },
    appointmentInfo: { marginLeft: 15 },
    doctorName: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
    appointmentTime: { color: colors.white, opacity: 0.8, fontSize: 14, marginTop: 2 },
    noUpcoming: { color: colors.white, opacity: 0.7, fontStyle: 'italic' },
    grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    actionBtn: { width: '48%', height: 100, backgroundColor: colors.white, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 2 },
    actionText: { marginTop: 8, fontWeight: '600', color: colors.textPrimary },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 15 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    statCard: { width: '48%', backgroundColor: colors.white, borderRadius: 15, padding: 15, elevation: 2 },
    iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    statValue: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary },
    statUnit: { fontSize: 12, color: colors.textSecondary, marginBottom: 5 },
    statLabel: { fontSize: 14, color: colors.textPrimary, fontWeight: '500' },
});
