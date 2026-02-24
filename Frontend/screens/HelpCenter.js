import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { ChevronLeft, Mail, Phone, Globe } from 'lucide-react-native';
import { colors } from '../constants/colors';

export default function HelpCenter({ navigation }) {
    const handleContact = (type) => {
        if (type === 'email') Linking.openURL('mailto:support@healthapp.com');
        if (type === 'phone') Linking.openURL('tel:+923000000000');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft color={colors.textPrimary} size={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help Center</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.mainTitle}>How can we help you?</Text>
                <Text style={styles.subtitle}>Our support team is available 24/7 to assist you with any issues.</Text>

                <TouchableOpacity style={styles.contactCard} onPress={() => handleContact('email')}>
                    <View style={styles.iconBox}>
                        <Mail color={colors.primaryDark} size={24} />
                    </View>
                    <View style={styles.cardText}>
                        <Text style={styles.cardTitle}>Email Us</Text>
                        <Text style={styles.cardSub}>support@healthapp.com</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactCard} onPress={() => handleContact('phone')}>
                    <View style={styles.iconBox}>
                        <Phone color={colors.primaryDark} size={24} />
                    </View>
                    <View style={styles.cardText}>
                        <Text style={styles.cardTitle}>Call Us</Text>
                        <Text style={styles.cardSub}>+92 300 000 0000</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.contactCard}>
                    <View style={styles.iconBox}>
                        <Globe color={colors.primaryDark} size={24} />
                    </View>
                    <View style={styles.cardText}>
                        <Text style={styles.cardTitle}>Website</Text>
                        <Text style={styles.cardSub}>www.healthapp.com</Text>
                    </View>
                </View>

                <View style={styles.noteBox}>
                    <Text style={styles.noteText}>Note: For medical emergencies, please dial 1122 or your local emergency number immediately.</Text>
                </View>
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
    mainTitle: { fontSize: 24, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 10 },
    subtitle: { fontSize: 15, color: colors.textSecondary, marginBottom: 30, lineHeight: 22 },
    contactCard: { flexDirection: 'row', backgroundColor: colors.white, padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 1 },
    iconBox: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    cardText: { flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 3 },
    cardSub: { fontSize: 14, color: colors.textSecondary },
    noteBox: { backgroundColor: '#ffebee', padding: 15, borderRadius: 12, marginTop: 20 },
    noteText: { color: colors.error, fontSize: 14, fontWeight: '600', lineHeight: 20, textAlign: 'center' },
});
