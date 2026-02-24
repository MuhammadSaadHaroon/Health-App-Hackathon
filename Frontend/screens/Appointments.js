import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import API from '../constants/api';
import { Calendar as CalendarIcon, Clock, ChevronRight } from 'lucide-react-native';

export default function Appointments() {
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAppointments = async (tab) => {
        setLoading(true);
        try {
            const endpoint = tab === 'Upcoming' ? '/appointments/upcoming' : '/appointments/history';
            const res = await API.get(endpoint);
            setData(res.data);
        } catch (err) {
            console.log('Fetch Appointments failed', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments(activeTab);
    }, [activeTab]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.doctorInfo}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{item.doctorName[0]}</Text>
                    </View>
                    <View>
                        <Text style={styles.doctorName}>Dr. {item.doctorName}</Text>
                        <Text style={styles.specialization}>General Physician</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'Confirmed' ? '#E8F5E9' : '#F5F5F5' }]}>
                    <Text style={[styles.statusText, { color: item.status === 'Confirmed' ? '#4CAF50' : '#9E9E9E' }]}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <CalendarIcon size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{item.date}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Clock size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{item.time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appointments</Text>

            <View style={styles.tabContainer}>
                {['Upcoming', 'History'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={() => fetchAppointments(activeTab)}
                ListEmptyComponent={<Text style={styles.emptyText}>No appointments found</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary, marginTop: 40, marginBottom: 20 },
    tabContainer: { flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 10, padding: 4, marginBottom: 20 },
    tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
    activeTab: { backgroundColor: colors.white, elevation: 2 },
    tabText: { fontWeight: '600', color: colors.textSecondary },
    activeTabText: { color: colors.primaryDark },
    list: { paddingBottom: 100 },
    card: { backgroundColor: colors.white, borderRadius: 15, padding: 15, marginBottom: 15, elevation: 3 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    doctorInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    avatarText: { fontSize: 20, fontWeight: 'bold', color: colors.primaryDark },
    doctorName: { fontSize: 17, fontWeight: 'bold', color: colors.textPrimary },
    specialization: { fontSize: 13, color: colors.textSecondary },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
    statusText: { fontSize: 12, fontWeight: '700' },
    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },
    detailsRow: { flexDirection: 'row', justifyContent: 'space-between' },
    detailItem: { flexDirection: 'row', alignItems: 'center' },
    detailText: { marginLeft: 6, fontSize: 14, color: colors.textSecondary },
    emptyText: { textAlign: 'center', marginTop: 50, color: colors.textSecondary, fontSize: 16 },
});
