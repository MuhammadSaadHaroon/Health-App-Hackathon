import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '../constants/colors';

export default function FAQ({ navigation }) {
    const faqs = [
        { q: 'How do I book an appointment?', a: 'Go to the Home or Schedule tab, select a doctor, and choose an available time slot.' },
        { q: 'Can I cancel my appointment?', a: 'Yes, you can cancel up to 24 hours before the scheduled time in the Schedule tab.' },
        { q: 'How are my medical records stored?', a: 'Your records are securely stored and encrypted in our database. Only you and your authorized doctors can access them.' },
        { q: 'Is telemedicine available?', a: 'Yes, you can book online video consultations with participating doctors.' },
        { q: 'How do I change my password?', a: 'Currently, you can contact support from the Help Center to reset your password if you forget it.' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft color={colors.textPrimary} size={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>FAQs</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {faqs.map((item, index) => (
                    <View key={index} style={styles.faqCard}>
                        <Text style={styles.question}>{item.q}</Text>
                        <Text style={styles.answer}>{item.a}</Text>
                    </View>
                ))}
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
    faqCard: { backgroundColor: colors.white, padding: 15, borderRadius: 12, marginBottom: 15, elevation: 1 },
    question: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 5 },
    answer: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
});
