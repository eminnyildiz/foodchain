import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useTheme } from '../../../hooks/useTheme';
import { useOrderStore } from '../../../store/orderStore';
import { useAuthStore } from '../../../store/authStore';
import { useReviewStore } from '../../../store/reviewStore';
import { Badge } from '../../../components/ui/Badge';
import { EmptyState } from '../../../components/ui/EmptyState';
import { formatPrice } from '../../../utils/formatters';
import { demoOrders } from '../../../data/orders';
import { demoRestaurants } from '../../../data/restaurants';
import { Order, OrderStatus } from '../../../types';

const statusBadgeVariant: Record<OrderStatus, 'warning' | 'info' | 'primary' | 'success' | 'error'> = {
  pending: 'warning',
  confirmed: 'info',
  preparing: 'primary',
  onTheWay: 'info',
  delivered: 'success',
  cancelled: 'error',
};

export default function OrdersScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const storeOrders = useOrderStore((s) => s.orders);
  const user = useAuthStore((s) => s.user);
  const reviewStore = useReviewStore();

  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const allOrders = [...storeOrders, ...demoOrders.filter((d) => !storeOrders.find((s) => s.id === d.id))];
  const active = allOrders.filter((o) => !['delivered', 'cancelled'].includes(o.status));
  const past = allOrders.filter((o) => ['delivered', 'cancelled'].includes(o.status));

  const handleOpenReview = (order: Order) => {
    if (!user) return;
    const alreadyReviewed = reviewStore.hasUserReviewedOrder(user.id, order.id);
    if (alreadyReviewed) {
      Alert.alert('⭐', t('restaurant.alreadyReviewed'));
      return;
    }
    setReviewOrder(order);
    setReviewRating(5);
    setReviewComment('');
    setReviewModalVisible(true);
  };

  const handleSubmitReview = () => {
    if (!user || !reviewOrder) return;
    reviewStore.addReview({
      orderId: reviewOrder.id,
      userId: user.id,
      restaurantId: reviewOrder.restaurantId,
      rating: reviewRating,
      comment: reviewComment,
    });
    setReviewModalVisible(false);
    setReviewOrder(null);
    Alert.alert(t('restaurant.reviewSubmitted'), t('restaurant.reviewSubmittedMessage'));
  };

  const renderOrder = (order: Order) => {
    const restaurant = demoRestaurants.find((r) => r.id === order.restaurantId);
    return (
    <Pressable
      key={order.id}
      onPress={() => router.push(`/(customer)/tracking/${order.id}`)}
      style={[
        styles.orderCard,
        { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg },
      ]}
    >
      {restaurant?.coverImage && (
        <Image
          source={{ uri: restaurant.coverImage }}
          style={[styles.orderImage, { borderRadius: theme.borderRadius.md }]}
        />
      )}
      <View style={styles.orderInfo}>
        <Text style={[styles.orderName, { color: theme.colors.text }]}>
          {restaurant?.name || `#${order.id}`}
        </Text>
        <Text style={[styles.orderMeta, { color: theme.colors.textTertiary }]}>
          {order.items.length} {t('cart.itemCount')} • {formatPrice(order.total)}
        </Text>
        <Text style={[styles.orderDate, { color: theme.colors.textTertiary }]}>
          {new Date(order.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.orderActions}>
        <Badge text={t(`orderStatus.${order.status}`)} variant={statusBadgeVariant[order.status]} />
        {order.status === 'delivered' && (
          <Pressable
            onPress={() => handleOpenReview(order)}
            style={[styles.rateBtn, { backgroundColor: theme.colors.accent, borderRadius: theme.borderRadius.sm }]}
          >
            <Text style={styles.rateBtnText}>⭐ {t('restaurant.rateOrder')}</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
    );
  };

  if (allOrders.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
        <EmptyState
          icon="📋"
          title={t('orders.noOrders')}
          subtitle={t('orders.noOrdersMessage')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={[]}
        renderItem={null}
        keyExtractor={() => 'dummy'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, { color: theme.colors.text }]}>{t('orders.myOrders')}</Text>

            {active.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                  🔴 {t('orders.activeOrders')} ({active.length})
                </Text>
                {active.map(renderOrder)}
              </>
            )}

            {past.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary, marginTop: 20 }]}>
                  {t('orders.pastOrders')}
                </Text>
                {past.map(renderOrder)}
              </>
            )}
          </>
        }
      />

      {/* Review Modal */}
      <Modal
        visible={reviewModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.xl }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              ⭐ {t('restaurant.writeReview')}
            </Text>
            {reviewOrder && (
              <Text style={[styles.modalSubtitle, { color: theme.colors.textSecondary }]}>
                #{reviewOrder.id}
              </Text>
            )}

            {/* Star Rating */}
            <Text style={[styles.ratingLabel, { color: theme.colors.text }]}>
              {t('restaurant.yourRating')}
            </Text>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable key={star} onPress={() => setReviewRating(star)} hitSlop={8}>
                  <Text style={styles.starBtn}>
                    {star <= reviewRating ? '⭐' : '☆'}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Comment */}
            <Text style={[styles.ratingLabel, { color: theme.colors.text }]}>
              {t('restaurant.yourComment')}
            </Text>
            <TextInput
              style={[
                styles.commentInput,
                {
                  backgroundColor: theme.colors.inputBackground,
                  borderColor: theme.colors.inputBorder,
                  color: theme.colors.text,
                  borderRadius: theme.borderRadius.md,
                },
              ]}
              placeholder={t('restaurant.commentPlaceholder')}
              placeholderTextColor={theme.colors.placeholder}
              value={reviewComment}
              onChangeText={setReviewComment}
              multiline
              numberOfLines={3}
              maxLength={300}
            />

            {/* Actions */}
            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setReviewModalVisible(false)}
                style={[styles.modalCancelBtn, { borderColor: theme.colors.border, borderRadius: theme.borderRadius.md }]}
              >
                <Text style={[styles.modalCancelText, { color: theme.colors.textSecondary }]}>
                  {t('common.cancel')}
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSubmitReview}
                style={[styles.modalSubmitBtn, { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.md }]}
              >
                <Text style={styles.modalSubmitText}>{t('restaurant.submitReview')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  list: { padding: 16 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  orderCard: { flexDirection: 'row', padding: 12, marginBottom: 12, alignItems: 'center', gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
  orderImage: { width: 56, height: 56 },
  orderInfo: { flex: 1 },
  orderName: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  orderMeta: { fontSize: 12, marginBottom: 2 },
  orderDate: { fontSize: 11 },
  orderActions: { alignItems: 'flex-end', gap: 6 },
  rateBtn: { paddingHorizontal: 10, paddingVertical: 5 },
  rateBtnText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { padding: 24, paddingBottom: 40 },
  modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalSubtitle: { fontSize: 14, marginBottom: 20 },
  ratingLabel: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  starRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  starBtn: { fontSize: 32 },
  commentInput: { borderWidth: 1, padding: 12, minHeight: 80, textAlignVertical: 'top', fontSize: 14, marginBottom: 20 },
  modalActions: { flexDirection: 'row', gap: 12 },
  modalCancelBtn: { flex: 1, borderWidth: 1, paddingVertical: 14, alignItems: 'center' },
  modalCancelText: { fontSize: 15, fontWeight: '600' },
  modalSubmitBtn: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  modalSubmitText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
