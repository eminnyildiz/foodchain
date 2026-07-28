import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, Switch, StyleSheet, Modal, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useTheme } from '../../../hooks/useTheme';
import { demoMenuItems } from '../../../data/menuItems';
import { formatPrice } from '../../../utils/formatters';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { MenuItem } from '../../../types';

export default function MenuManagementScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [items, setItems] = useState<MenuItem[]>(demoMenuItems.filter((m) => m.restaurantId === 'r1'));
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const toggleAvailability = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  const deleteItem = (id: string) => {
    // Web support for confirm
    if (typeof window !== 'undefined' && window.confirm) {
      if (window.confirm(t('restaurantPanel.deleteItem') + '?')) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } else {
      // Direct deletion for simplicity if Alert is problematic
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category
      });
    } else {
      setEditingItem(null);
      setFormData({ name: '', description: '', price: '', category: '' });
    }
    setModalVisible(true);
  };

  const saveItem = () => {
    if (!formData.name || !formData.price) return;
    
    if (editingItem) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...formData, price: parseFloat(formData.price) || 0 }
            : item
        )
      );
    } else {
      const newItem: MenuItem = {
        id: 'm' + Date.now(),
        restaurantId: 'r1',
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80',
        category: formData.category || 'Genel',
        isAvailable: true,
      };
      setItems([newItem, ...items]);
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('restaurantPanel.menuManagement')}</Text>
        <Button title={`+ ${t('restaurantPanel.addItem')}`} onPress={() => openModal()} size="sm" />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable 
            style={[styles.itemCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg, opacity: item.isAvailable ? 1 : 0.6 }]}
            onPress={() => openModal(item)}
          >
            {item.image && (
              <Image source={{ uri: item.image }} style={[styles.itemImg, { borderRadius: theme.borderRadius.md }]} contentFit="cover" />
            )}
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: theme.colors.text }]} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.itemCategory, { color: theme.colors.textTertiary }]}>{item.category}</Text>
              <Text style={[styles.itemPrice, { color: theme.colors.primary }]}>{formatPrice(item.price)}</Text>
            </View>
            <View style={styles.itemActions}>
              <Switch
                value={item.isAvailable}
                onValueChange={() => toggleAvailability(item.id)}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary + '60' }}
                thumbColor={item.isAvailable ? theme.colors.primary : '#ccc'}
              />
              <Pressable onPress={() => deleteItem(item.id)} hitSlop={12} style={{ padding: 4 }}>
                <Text style={{ color: theme.colors.error, fontSize: 18 }}>🗑️</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
      />

      {/* Add / Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background, borderRadius: theme.borderRadius.xl }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              {editingItem ? t('restaurantPanel.editItem') : t('restaurantPanel.addItem')}
            </Text>
            
            <ScrollView style={{ width: '100%', maxHeight: '70%' }}>
              <Input
                label={t('restaurantPanel.itemName')}
                value={formData.name}
                onChangeText={(t) => setFormData(prev => ({...prev, name: t}))}
                placeholder="Örn: Karışık Pizza"
              />
              <Input
                label={t('restaurantPanel.itemDescription')}
                value={formData.description}
                onChangeText={(t) => setFormData(prev => ({...prev, description: t}))}
                placeholder="Örn: Sucuk, mantar, kaşar..."
              />
              <Input
                label={t('restaurantPanel.itemPrice')}
                value={formData.price}
                onChangeText={(t) => setFormData(prev => ({...prev, price: t.replace(/[^0-9.]/g, '')}))}
                placeholder="0.00"
                keyboardType="numeric"
              />
              <Input
                label={t('restaurantPanel.itemCategory')}
                value={formData.category}
                onChangeText={(t) => setFormData(prev => ({...prev, category: t}))}
                placeholder="Örn: Pizzalar"
              />
            </ScrollView>
            
            <View style={styles.modalActions}>
              <View style={{ flex: 1 }}>
                <Button title={t('common.cancel')} onPress={() => setModalVisible(false)} variant="outline" />
              </View>
              <View style={{ flex: 1 }}>
                <Button title={t('common.save')} onPress={saveItem} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 22, fontWeight: '800' },
  list: { padding: 16, gap: 10 },
  itemCard: { flexDirection: 'row', padding: 12, gap: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  itemImg: { width: 60, height: 60 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  itemCategory: { fontSize: 11, marginBottom: 4 },
  itemPrice: { fontSize: 15, fontWeight: '800' },
  itemActions: { alignItems: 'center', gap: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { padding: 24, paddingBottom: 40, alignItems: 'center', width: '100%' },
  modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 20 },
  modalActions: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 20 }
});
