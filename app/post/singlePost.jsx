import Bookmark from "@/assets/icons/Bookmark.svg";
import FeedChat from "@/assets/icons/feed-chat.svg";
import Like from "@/assets/icons/like.svg";
import Action from "@/assets/icons/more-menu.svg";
import Repost from "@/assets/icons/repost.svg";
import ChatInput from "@/components/Forms/ChatInput";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import CommentCard from "@/components/Reusables/CommentCard";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { supabase } from "@/lib/supabase";
import {
  addBookmark,
  addComment,
  addReaction,
  getPostComments,
  removeBookmark,
  removeReaction,
} from "@/lib/supabaseServices";
import { getRelativeTime } from "@/utils/dateHelpers";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SinglePost = () => {
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [sendingComment, setSendingComment] = useState(false);

  useEffect(() => {
    if (postId) {
      loadPost();
      loadComments();
    }
  }, [postId]);

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const loadPost = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          profiles!posts_author_id_fkey(id, full_name, email, avatar_url),
          communities(id, name, category)
        `
        )
        .eq("id", postId)
        .single();

      if (error) throw error;

      const postData = {
        ...data,
        author: data.profiles,
        community: data.communities,
      };

      setPost(postData);

      // Get reaction count
      const { data: reactions } = await supabase
        .from("post_reactions")
        .select("*")
        .eq("post_id", postId);

      setLikeCount(reactions?.length || 0);

      // Check if current user has liked
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const userReaction = reactions?.find((r) => r.user_id === user.id);
        setHasLiked(!!userReaction);
      }
    } catch (error) {
      console.error("Error loading post:", error);
      Alert.alert("Error", "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const commentsData = await getPostComments(postId);
      const formattedComments = commentsData?.map((comment) => ({
        ...comment,
        time: getRelativeTime(comment.created_at),
      }));
      setComments(formattedComments || []);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  const handleLike = async () => {
    try {
      if (hasLiked) {
        await removeReaction(postId);
        setHasLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await addReaction(postId, "love");
        setHasLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await removeBookmark(postId);
        setIsBookmarked(false);
      } else {
        await addBookmark(postId);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;

    setSendingComment(true);
    try {
      const newComment = await addComment(postId, commentText.trim());
      setComments((prev) => [newComment, ...prev]);
      setCommentText("");
      Keyboard.dismiss();
    } catch (error) {
      console.error("Comment error:", error);
      Alert.alert("Error", "Failed to post comment");
    } finally {
      setSendingComment(false);
    }
  };

  if (loading) {
    return (
      <View className="bg-[#F9FAFB] flex-1">
        <View className="pt-16 px-6">
          <ArrowTitlebar title="Post" action />
        </View>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#000E3A" />
          <Text className="mt-4 text-[#ADADAD] text-[14px]">
            Loading post...
          </Text>
        </View>
      </View>
    );
  }

  if (!post) {
    return (
      <View className="bg-[#F9FAFB] flex-1">
        <View className="pt-16 px-6">
          <ArrowTitlebar title="Post" action />
        </View>
        <View className="flex-1 justify-center items-center">
          <Text className="text-[#ADADAD] text-[16px]">Post not found</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-[#F9FAFB] flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="pt-16 flex-1">
          <View className="px-6">
            <ArrowTitlebar title="Post" action />
          </View>
          <View className="bg-white border border-[#F2F2F2] flex-1 p-6">
            <View className="flex-row justify-between items-center">
              <View className="flex-row justify-start gap-3 items-center">
                {post?.author?.avatar_url ? (
                  <Image
                    source={{ uri: post.author.avatar_url }}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                ) : (
                  <View className="w-[44px] h-[44px] rounded-full bg-[#000E3A] justify-center items-center">
                    <Text className="text-[#13E0A0] text-[16px] font-bold">
                      {getInitials(post?.author?.full_name)}
                    </Text>
                  </View>
                )}
                <View>
                  <TextHeader
                    content={post?.author?.full_name || "Anonymous"}
                    customLineHeight={20}
                    textStyles="text-[#030303] text-[14px]"
                  />
                  <TextContainer
                    content={getRelativeTime(post?.created_at)}
                    textStyles="text-[#ADADAD] text-[12px]"
                  />
                </View>
              </View>
              <TouchableOpacity>
                <Action width={24} height={24} />
              </TouchableOpacity>
            </View>
            <View>
              <TextContainer
                content={post?.content}
                textStyles="text-[14px]"
                viewStyles="pt-3"
                customHeight="22"
              />
              {post?.image_url && (
                <Image
                  source={{ uri: post.image_url }}
                  className="w-full mt-4 rounded-[8px]"
                  width={334}
                  height={241}
                />
              )}
            </View>
            <View className="flex-row border-b border-[#F2F2F2] justify-between items-center py-4">
              <TextContainer
                content={`${likeCount} ${likeCount === 1 ? "like" : "likes"}`}
                textStyles="text-[14px] text-[#ADADAD]"
              />
              <TextContainer
                content={`${comments.length} ${
                  comments.length === 1 ? "comment" : "comments"
                }`}
                textStyles="text-[14px] text-[#ADADAD]"
              />
            </View>
            <View className="flex-row justify-between items-center py-3 gap-4 border-b border-[#F2F2F2]">
              <TouchableOpacity
                className="flex-row justify-start items-center gap-1"
                onPress={handleLike}
              >
                <Like
                  width={24}
                  height={24}
                  fill={hasLiked ? "#000E3A" : "none"}
                />
                <TextContainer
                  content="Like"
                  textStyles={`text-[14px] ${
                    hasLiked ? "text-[#000E3A]" : "text-[#ADADAD]"
                  }`}
                  viewStyles="pt-1"
                />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row justify-start items-center gap-1">
                <FeedChat width={24} height={24} />
                <TextContainer
                  content="Comment"
                  textStyles="text-[14px] text-[#ADADAD]"
                  viewStyles="pt-1"
                />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row justify-start items-center gap-1">
                <Repost width={24} height={24} />
                <TextContainer
                  content="Repost"
                  textStyles="text-[14px] text-[#ADADAD]"
                  viewStyles="pt-1"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBookmark}>
                <Bookmark
                  width={24}
                  height={24}
                  fill={isBookmarked ? "#000E3A" : "none"}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={comments}
              renderItem={({ item }) => <CommentCard comment={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 8, paddingBottom: 120 }}
              ItemSeparatorComponent={() => <View className="h-4" />}
              ListEmptyComponent={
                <View className="py-10">
                  <TextContainer
                    content="No comments yet. Be the first to comment!"
                    textStyles="text-[#ADADAD] text-[14px] text-center"
                  />
                </View>
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ChatInput
        value={commentText}
        onChangeText={setCommentText}
        onSend={handleSendComment}
        loading={sendingComment}
      />
    </KeyboardAvoidingView>
  );
};

export default SinglePost;
