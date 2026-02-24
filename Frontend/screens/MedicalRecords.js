import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { colors } from '../constants/colors';
import API from '../constants/api';
import { FileText, Plus, Download, Trash2 } from 'lucide-react-native';

export default function MedicalRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('Report');

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const res = await API.get('/records');
            setRecords(res.data);
        } catch (err) {
            console.log('Fetch Records failed', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!newTitle) return Alert.alert('Error', 'Title is required');
        try {
            await API.post('/records/upload', {
                title: newTitle,
                category: newCategory,
                fileUrl: 'sample_base64_or_url'
            });
            setModalVisible(false);
            setNewTitle('');
            fetchRecords();
        } catch (err) {
            Alert.alert('Error', 'Upload failed');
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <FileText color={colors.primaryDark} size={28} />
            </View>
            <View style={styles.info}>
                <Text style={styles.recordTitle}>{item.title}</Text>
                <Text style={styles.recordMeta}>{item.category} • {new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity style={styles.actionBtn}>
                <Download color={colors.textSecondary} size={20} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Medical Records</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
                    <Plus color={colors.white} size={24} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={records}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={fetchRecords}
                ListEmptyComponent={<Text style={styles.emptyText}>No records uploaded yet</Text>}
            />

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Record</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Record Title (e.g. Blood Test)"
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />
                        <View style={styles.categoryRow}>
                            {['Report', 'Prescription', 'Lab'].map(cat => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[styles.catBtn, newCategory === cat && styles.activeCat]}
                                    onPress={() => setNewCategory(cat)}
                                >
                                    <Text style={[styles.catText, newCategory === cat && styles.activeCatText]}>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity style={styles.submitBtn} onPress={handleUpload}>
                            <Text style={styles.submitText}>Upload Record</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary },
    addBtn: { width: 45, height: 45, borderRadius: 22, backgroundColor: colors.primaryDark, justifyContent: 'center', alignItems: 'center', elevation: 3 },
    list: { paddingBottom: 100 },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: 15, borderRadius: 15, marginBottom: 15, elevation: 2 },
    iconContainer: { width: 50, height: 50, borderRadius: 12, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    info: { flex: 1 },
    recordTitle: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary },
    recordMeta: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
    actionBtn: { padding: 8 },
    emptyText: { textAlign: 'center', marginTop: 50, color: colors.textSecondary },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30, alignItems: 'center' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '100%', height: 55, backgroundColor: colors.secondary, borderRadius: 12, paddingHorizontal: 15, marginBottom: 15 },
    categoryRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 25 },
    catBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8, marginHorizontal: 5, backgroundColor: colors.secondary },
    activeCat: { backgroundColor: colors.primaryDark },
    catText: { color: colors.textPrimary, fontWeight: '600' },
    activeCatText: { color: colors.white },
    submitBtn: { width: '100%', height: 55, backgroundColor: colors.primaryDark, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    submitText: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
    cancelText: { color: colors.error, fontWeight: 'bold' },
});
