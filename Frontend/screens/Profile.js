import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../constants/colors';
import API from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LogOut, ChevronRight, HelpCircle, Shield, CircleHelp } from 'lucide-react-native';

export default function Profile({ navigation }) {
    const [user, setUser] = useState(null);

    useFocusEffect(
        useCallback(() => {
            const fetchUser = async () => {
                const data = await AsyncStorage.getItem('user');
                if (data) setUser(JSON.parse(data));
            };
            fetchUser();
        }, [])
    );

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        Alert.alert('Logged Out', 'You have been logged out.');
        // In real app, this would trigger state update in App.js
    };

    const MenuOption = ({ icon: Icon, title, onPress }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuLeft}>
                <View style={styles.menuIconBox}>
                    <Icon size={20} color={colors.primaryDark} />
                </View>
                <Text style={styles.menuTitle}>{title}</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user?.name[0] || 'U'}</Text>
                </View>
                <Text style={styles.userName}>{user?.name || 'User'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
                <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
                    <Text style={styles.editBtnText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuSection}>
                <MenuOption icon={HelpCircle} title="FAQs" onPress={() => navigation.navigate('FAQ')} />
                <MenuOption icon={Shield} title="Privacy & Security" onPress={() => navigation.navigate('PrivacySecurity')} />
                <MenuOption icon={CircleHelp} title="Help Center" onPress={() => navigation.navigate('HelpCenter')} />
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <LogOut color={colors.error} size={22} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary, marginTop: 40, marginBottom: 30 },
    profileHeader: { alignItems: 'center', marginBottom: 40 },
    avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 5 },
    avatarText: { fontSize: 40, fontWeight: 'bold', color: colors.primaryDark },
    userName: { fontSize: 24, fontWeight: 'bold', color: colors.textPrimary },
    userEmail: { fontSize: 15, color: colors.textSecondary, marginTop: 5 },
    editBtn: { marginTop: 15, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.primaryDark },
    editBtnText: { color: colors.primaryDark, fontWeight: '600' },
    menuSection: { backgroundColor: colors.white, borderRadius: 20, padding: 10, elevation: 2 },
    menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
    menuLeft: { flexDirection: 'row', alignItems: 'center' },
    menuIconBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    menuTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, padding: 15 },
    logoutText: { marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: colors.error },
});
