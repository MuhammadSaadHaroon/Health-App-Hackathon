import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '../constants/colors';
import API from '../constants/api';

export default function EditProfile({ navigation }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const data = await AsyncStorage.getItem('user');
            if (data) {
                const user = JSON.parse(data);
                setName(user.name || '');
                setPhone(user.phone || '');
            }
            setInitializing(false);
        };
        loadUser();
    }, []);

    const handleSave = async () => {
        if (!name) {
            Alert.alert('Error', 'Name is required.');
            return;
        }

        setLoading(true);
        try {
            const response = await API.put('/user/update', { name, phone });
            // Update local storage with new user data
            const updatedUser = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

            Alert.alert('Success', 'Profile updated successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (err) {
            Alert.alert('Update Failed', err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (initializing) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primaryDark} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft color={colors.textPrimary} size={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={{ width: 28 }} />
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />

                <TouchableOpacity
                    style={[styles.saveBtn, loading && { opacity: 0.7 }]}
                    onPress={handleSave}
                    disabled={loading}
                >
                    <Text style={styles.saveBtnText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, marginBottom: 30 },
    backBtn: { padding: 5 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary },
    form: { width: '100%' },
    label: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 5, marginTop: 15 },
    input: { height: 55, backgroundColor: colors.white, borderRadius: 12, paddingHorizontal: 15, fontSize: 16, color: colors.textPrimary, borderWidth: 1, borderColor: colors.secondary },
    saveBtn: { height: 55, backgroundColor: colors.primaryDark, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 40, elevation: 2 },
    saveBtnText: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
});
