import { supabase } from "./supabase";

// ============ COMMUNITIES ============

export const createCommunity = async ({
  name,
  description,
  category,
  privacySetting,
  rules,
  imageUrl = null,
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("communities")
    .insert({
      name,
      description,
      category,
      privacy_setting: privacySetting,
      rules,
      image_url: imageUrl,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) throw error;

  // Auto-join creator to the community
  await joinCommunity(data.id);

  return data;
};

export const getCommunitiesByCategory = async (category) => {
  const { data, error } = await supabase
    .from("community_stats")
    .select("*")
    .eq("category", category)
    .order("member_count", { ascending: false });

  if (error) throw error;
  return data;
};

export const getAllCommunities = async () => {
  const { data, error } = await supabase
    .from("community_stats")
    .select("*")
    .order("member_count", { ascending: false });

  if (error) throw error;
  return data;
};

export const joinCommunity = async (communityId) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("community_members")
    .insert({
      community_id: communityId,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const leaveCommunity = async (communityId) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("community_members")
    .delete()
    .eq("community_id", communityId)
    .eq("user_id", user.id);

  if (error) throw error;
};

export const getUserCommunities = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("community_members")
    .select(
      `
      *,
      communities:community_id (
        id,
        name,
        category,
        image_url
      )
    `
    )
    .eq("user_id", user.id);

  if (error) throw error;
  return data.map((item) => item.communities);
};

// ============ POSTS ============

// ============ POSTS ============

export const getAllPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles!posts_author_id_fkey(id, full_name, email, avatar_url),
      post_reactions(id),
      post_comments(id)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Transform the data to match expected structure
  return data.map((post) => ({
    ...post,
    author: post.profiles || {
      full_name: "Unknown User",
      email: "",
      avatar_url: null,
    },
    reactions: post.post_reactions || [],
    comments: post.post_comments || [],
  }));
};

export const getPostsByCommunity = async (communityId) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles!posts_author_id_fkey(id, full_name, email, avatar_url),
      communities(id, name, category),
      post_reactions(id),
      post_comments(id)
    `
    )
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((post) => ({
    ...post,
    author: post.profiles || {
      full_name: "Unknown User",
      email: "",
      avatar_url: null,
    },
    community: post.communities,
    reactions: post.post_reactions || [],
    comments: post.post_comments || [],
  }));
};

export const getPostsByCommunityId = async (communityId) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles!posts_author_id_fkey(id, full_name, email, avatar_url),
      communities(id, name, category),
      post_reactions(id),
      post_comments(id)
    `
    )
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((post) => ({
    ...post,
    author: post.profiles || {
      full_name: "Unknown User",
      email: "",
      avatar_url: null,
    },
    community: post.communities,
    reactions: post.post_reactions || [],
    comments: post.post_comments || [],
  }));
};

export const getUserFeedPosts = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  // Get user's joined communities
  const { data: userCommunities } = await supabase
    .from("community_members")
    .select("community_id")
    .eq("user_id", user.id);

  const communityIds = userCommunities?.map((c) => c.community_id) || [];

  if (communityIds.length === 0) {
    return [];
  }

  // Get posts from joined communities only
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles!posts_author_id_fkey(id, full_name, email, avatar_url),
      communities(id, name, category),
      post_reactions(id),
      post_comments(id)
    `
    )
    .in("community_id", communityIds)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((post) => ({
    ...post,
    author: post.profiles || {
      full_name: "Unknown User",
      email: "",
      avatar_url: null,
    },
    community: post.communities,
    reactions: post.post_reactions || [],
    comments: post.post_comments || [],
  }));
};

export const createPost = async ({
  content,
  imageUrl = null,
  communityId = null,
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("posts")
    .insert({
      content,
      image_url: imageUrl,
      author_id: user.id,
      community_id: communityId,
    })
    .select(
      `
      *,
      profiles!posts_author_id_fkey(id, full_name, email),
      communities(id, name, category)
    `
    )
    .single();

  if (error) throw error;

  return {
    ...data,
    author: data.profiles,
    community: data.communities,
  };
};

// ============ REACTIONS ============

export const addReaction = async (postId, reactionType) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("post_reactions")
    .upsert(
      {
        post_id: postId,
        user_id: user.id,
        reaction_type: reactionType,
      },
      {
        onConflict: "post_id,user_id",
      }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeReaction = async (postId) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("post_reactions")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", user.id);

  if (error) throw error;
};

export const getPostReactions = async (postId) => {
  const { data, error } = await supabase
    .from("post_reactions")
    .select("*")
    .eq("post_id", postId);

  if (error) throw error;
  return data;
};

// ============ COMMENTS ============

export const addComment = async (postId, content) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("post_comments")
    .insert({
      post_id: postId,
      user_id: user.id,
      content,
    })
    .select(
      `
      *,
      profiles!post_comments_user_id_fkey(id, full_name, email)
    `
    )
    .single();

  if (error) throw error;

  return {
    ...data,
    author: data.profiles,
  };
};

export const getPostComments = async (postId) => {
  const { data, error } = await supabase
    .from("post_comments")
    .select(
      `
      *,
      profiles!post_comments_user_id_fkey(id, full_name, email)
    `
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((comment) => ({
    ...comment,
    author: comment.profiles,
  }));
};

// ============ BOOKMARKS ============

export const addBookmark = async (postId) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("post_bookmarks")
    .insert({
      post_id: postId,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeBookmark = async (postId) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("post_bookmarks")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", user.id);

  if (error) throw error;
};

export const getUserBookmarks = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("post_bookmarks")
    .select(
      `
      *,
      post:posts(
        *,
        author:profiles!author_id(id, full_name, email),
        community:communities(id, name, category)
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map((item) => item.post);
};

// ============ PRODUCTS ============

export const getAllProducts = async (category = null) => {
  let query = supabase
    .from("products")
    .select(
      `
      *,
      seller:profiles!seller_id(id, full_name, email, avatar_url)
    `
    )
    .order("created_at", { ascending: false });

  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map((product) => ({
    ...product,
    seller: product.seller,
  }));
};

export const getProductById = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      seller:profiles!seller_id(id, full_name, email, avatar_url)
    `
    )
    .eq("id", productId)
    .single();

  if (error) throw error;
  return {
    ...data,
    seller: data.seller,
  };
};

export const createProduct = async ({
  name,
  description,
  price,
  category,
  condition = "pre-owned",
  location,
  imageUrls = [],
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      description,
      price,
      category,
      condition,
      location,
      image_urls: imageUrls,
      seller_id: user.id,
    })
    .select(
      `
      *,
      seller:profiles!seller_id(id, full_name, email, avatar_url)
    `
    )
    .single();

  if (error) throw error;
  return data;
};

export const updateProduct = async (productId, updates) => {
  const { data, error } = await supabase
    .from("products")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProduct = async (productId) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) throw error;
};

// ============ CART ============

export const getCartItems = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      product:products(
        *,
        seller:profiles!seller_id(id, full_name, email, avatar_url)
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map((item) => ({
    ...item,
    product: item.product,
  }));
};

export const addToCart = async (productId, quantity = 1) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  // Check if item already exists in cart
  const { data: existing } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existing) {
    // Update quantity
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    // Insert new cart item
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        user_id: user.id,
        product_id: productId,
        quantity,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeFromCart = async (cartItemId) => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  if (error) throw error;
};

export const clearCart = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id);

  if (error) throw error;
};

// ============ ORDERS ============

export const createOrder = async ({ deliveryAddress, cartItems }) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_amount: totalAmount,
      delivery_address: deliveryAddress,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  // Clear cart
  await clearCart();

  return order;
};

export const getUserOrders = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items(
        *,
        product:products(
          *,
          seller:profiles!seller_id(id, full_name, email, avatar_url)
        )
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items(
        *,
        product:products(
          *,
          seller:profiles!seller_id(id, full_name, email, avatar_url)
        )
      )
    `
    )
    .eq("id", orderId)
    .single();

  if (error) throw error;
  return data;
};
