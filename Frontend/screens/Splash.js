import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';

export default function Splash() {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                    <Text style={styles.logoText}>H</Text>
                </View>
                <Text style={styles.appName}>Health App</Text>
                <Text style={styles.tagline}>Your Health, Simplified</Text>
            </View>
            <ActivityIndicator size="large" color={colors.primaryDark} style={styles.loader} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5,
    },
    logoText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: colors.primaryDark,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    tagline: {
        fontSize: 16,
        color: colors.textSecondary,
        marginTop: 5,
    },
    loader: {
        position: 'absolute',
        bottom: 50,
    },
});
