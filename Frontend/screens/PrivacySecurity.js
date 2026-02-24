import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { colors } from '../constants/colors';

export default function PrivacySecurity({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft color={colors.textPrimary} size={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy & Security</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.iconContainer}>
                    <ShieldCheck size={60} color={colors.primaryDark} />
                </View>

                <Text style={styles.sectionTitle}>Data Protection</Text>
                <Text style={styles.paragraph}>
                    Your health data is our top priority. All personalized medical records and personal information are encrypted in transit and at rest using industry-standard protocols.
                </Text>

                <Text style={styles.sectionTitle}>Information Sharing</Text>
                <Text style={styles.paragraph}>
                    We do not sell your personal data to third parties. Your information is only shared with the healthcare professionals you explicitly book appointments with.
                </Text>

                <Text style={styles.sectionTitle}>Account Security</Text>
                <Text style={styles.paragraph}>
                    Your account is secured with password hashing. We recommend using a strong, unique password. If you notice unusual activity, please contact support immediately.
                </Text>

                <Text style={styles.sectionTitle}>App Permissions</Text>
                <Text style={styles.paragraph}>
                    The Health App requires network access to sync your appointments and records. Camera and storage access may be requested only when you upload medical documents or profile pictures.
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: colors.secondary },
    backBtn: { padding: 5 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary },
    scrollContent: { padding: 20 },
    iconContainer: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.primaryDark, marginTop: 15, marginBottom: 8 },
    paragraph: { fontSize: 15, color: colors.textSecondary, lineHeight: 22, marginBottom: 15 },
});
