import { sendPushNotification } from "./pushNotificationService";
import { supabase } from "./supabase";

// ============ NOTIFICATIONS ============

/**
 * Get all notifications for the current user
 */
export const getAllNotifications = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Get unread notifications for the current user
 */
export const getUnreadNotifications = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .eq("read", false)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Get read notifications for the current user
 */
export const getReadNotifications = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .eq("read", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Mark a specific notification as read
 * @param {string} notificationId - The notification ID
 */
export const markNotificationAsRead = async (notificationId) => {
  const { data, error } = await supabase
    .from("notifications")
    .update({ read: true, updated_at: new Date().toISOString() })
    .eq("id", notificationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Mark all notifications as read for the current user
 */
export const markAllNotificationsAsRead = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("notifications")
    .update({ read: true, updated_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .eq("read", false);

  if (error) throw error;
};

/**
 * Delete a specific notification
 * @param {string} notificationId - The notification ID
 */
export const deleteNotification = async (notificationId) => {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notificationId);

  if (error) throw error;
};

/**
 * Delete all read notifications for the current user
 */
export const deleteAllReadNotifications = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("user_id", user.id)
    .eq("read", true);

  if (error) throw error;
};

/**
 * Get count of unread notifications
 * @returns {Promise<number>} Count of unread notifications
 */
export const getUnreadNotificationCount = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("read", false);

  if (error) throw error;
  return count || 0;
};

/**
 * Create a notification manually
 * @param {Object} params - Notification parameters
 * @param {string} params.userId - User ID to send notification to
 * @param {string} params.type - Notification type
 * @param {string} params.title - Notification title
 * @param {string} params.message - Notification message
 * @param {Object} params.data - Additional data (optional)
 */
export const createNotification = async ({
  userId,
  type,
  title,
  message,
  data = {},
  sendPush = true, // New parameter to control push notification
}) => {
  const { data: notification, error } = await supabase
    .from("notifications")
    .insert({
      user_id: userId,
      type,
      title,
      message,
      data,
    })
    .select()
    .single();

  if (error) throw error;

  // Send push notification if enabled
  if (sendPush) {
    await sendPushNotification({
      userId,
      title,
      body: message,
      data: { notificationId: notification.id, type, ...data },
    });
  }

  return notification;
};

/**
 * Create a chat message notification
 * @param {string} recipientId - User ID to receive notification
 * @param {string} senderName - Name of the message sender
 * @param {string} chatId - Chat/conversation ID
 * @param {string} senderId - Sender's user ID
 * @param {string} messagePreview - Preview of the message (optional)
 */
export const notifyChatMessage = async ({
  recipientId,
  senderName,
  chatId,
  senderId,
  messagePreview = "",
}) => {
  return createNotification({
    userId: recipientId,
    type: "chat_message",
    title: "New Message",
    message: messagePreview
      ? `${senderName}: ${messagePreview}`
      : `${senderName} sent you a message`,
    data: {
      chat_id: chatId,
      sender_id: senderId,
      sender_name: senderName,
    },
    sendPush: true,
  });
};

/**
 * Create a connection request notification
 * @param {string} recipientId - User ID to receive notification
 * @param {string} requesterName - Name of the person requesting connection
 * @param {string} requesterId - Requester's user ID
 * @param {string} requesterAvatar - Requester's avatar URL (optional)
 */
export const notifyConnectionRequest = async ({
  recipientId,
  requesterName,
  requesterId,
  requesterAvatar = null,
}) => {
  return createNotification({
    userId: recipientId,
    type: "connection_request",
    title: "New Connection Request",
    message: `${requesterName} wants to connect with you`,
    data: {
      requester_id: requesterId,
      requester_name: requesterName,
      requester_avatar: requesterAvatar,
    },
    sendPush: true,
  });
};

/**
 * Create a course enrollment notification
 * @param {string} userId - User ID to receive notification
 * @param {string} courseName - Name of the course
 * @param {string} courseId - Course ID
 */
export const notifyCourseEnrollment = async ({
  userId,
  courseName,
  courseId,
}) => {
  return createNotification({
    userId,
    type: "course_enrolled",
    title: "Course Enrollment",
    message: `You have successfully enrolled in "${courseName}"`,
    data: {
      course_id: courseId,
      course_name: courseName,
    },
    sendPush: true,
  });
};

/**
 * Create a past questions access notification
 * @param {string} userId - User ID to receive notification
 * @param {string} questionTitle - Title of the past question
 * @param {string} questionId - Past question ID
 */
export const notifyPastQuestionAccess = async ({
  userId,
  questionTitle,
  questionId,
}) => {
  return createNotification({
    userId,
    type: "past_question_access",
    title: "Past Question Available",
    message: `You now have access to "${questionTitle}"`,
    data: {
      question_id: questionId,
      question_title: questionTitle,
    },
    sendPush: true,
  });
};

/**
 * Create a quiz completion notification
 * @param {string} userId - User ID to receive notification
 * @param {string} quizName - Name of the quiz
 * @param {number} score - Quiz score
 * @param {string} quizId - Quiz ID
 */
export const notifyQuizCompletion = async ({
  userId,
  quizName,
  score,
  quizId,
}) => {
  return createNotification({
    userId,
    type: "quiz_completed",
    title: "Quiz Completed",
    message: `You scored ${score}% on "${quizName}"`,
    data: {
      quiz_id: quizId,
      quiz_name: quizName,
      score,
    },
    sendPush: true,
  });
};

/**
 * Create a connection accepted notification
 * @param {string} recipientId - User ID to receive notification
 * @param {string} accepterName - Name of the person who accepted
 * @param {string} accepterId - Accepter's user ID
 */
export const notifyConnectionAccepted = async ({
  recipientId,
  accepterName,
  accepterId,
}) => {
  return createNotification({
    userId: recipientId,
    type: "connection_accepted",
    title: "Connection Accepted",
    message: `${accepterName} accepted your connection request`,
    data: {
      accepter_id: accepterId,
      accepter_name: accepterName,
    },
    sendPush: true,
  });
};

/**
 * Create an order status update notification
 * @param {string} userId - User ID to receive notification
 * @param {string} orderId - Order ID
 * @param {string} status - New order status
 */
export const notifyOrderStatus = async ({ userId, orderId, status }) => {
  const statusMessages = {
    pending: "Your order has been placed and is pending confirmation",
    confirmed: "Your order has been confirmed",
    shipped: "Your order has been shipped",
    delivered: "Your order has been delivered",
    cancelled: "Your order has been cancelled",
  };

  return createNotification({
    userId,
    type: "order_status",
    title: "Order Update",
    message: statusMessages[status] || "Your order status has been updated",
    data: {
      order_id: orderId,
      status,
    },
    sendPush: true,
  });
};

/**
 * Subscribe to real-time notifications for the current user
 * @param {Function} callback - Function to call when new notification arrives
 * @returns {Object} Subscription object with unsubscribe method
 */
export const subscribeToNotifications = (callback) => {
  const subscription = supabase
    .channel("notifications")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return {
    unsubscribe: () => {
      subscription.unsubscribe();
    },
  };
};

/**
 * Notification types enum for reference
 */
export const NotificationTypes = {
  ACCOUNT_CREATED: "account_created",
  PRODUCT_CREATED: "product_created",
  PRODUCT_SOLD: "product_sold",
  COMMUNITY_JOINED: "community_joined",
  POST_COMMENT: "post_comment",
  POST_REACTION: "post_reaction",
  CHAT_MESSAGE: "chat_message",
  CONNECTION_REQUEST: "connection_request",
  CONNECTION_ACCEPTED: "connection_accepted",
  COURSE_ENROLLED: "course_enrolled",
  PAST_QUESTION_ACCESS: "past_question_access",
  QUIZ_COMPLETED: "quiz_completed",
  ORDER_STATUS: "order_status",
};
