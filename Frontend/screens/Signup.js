import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { colors } from '../constants/colors';
import API from '../constants/api';

export default function Signup({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }
        setLoading(true);
        try {
            await API.post('/auth/signup', { name, email, password, phone });
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('Login');
        } catch (err) {
            Alert.alert('Signup Failed', err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Start your health journey</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.signupBtn, loading && { opacity: 0.7 }]}
                    onPress={handleSignup}
                    disabled={loading}
                >
                    <Text style={styles.signupBtnText}>{loading ? 'Creating...' : 'Sign Up'}</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.white,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginTop: 5,
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        height: 55,
        backgroundColor: colors.secondary,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: colors.textPrimary,
    },
    signupBtn: {
        height: 55,
        backgroundColor: colors.primaryDark,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
        elevation: 2,
    },
    signupBtnText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    footerText: {
        color: colors.textSecondary,
        fontSize: 15,
    },
    loginLink: {
        color: colors.primaryDark,
        fontWeight: 'bold',
        fontSize: 15,
    },
});
