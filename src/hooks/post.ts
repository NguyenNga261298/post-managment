import { useEffect, useState } from "react";

import { getPosts, getPostDetail } from "../services/apis/post";
import { Post, PostQuery } from "../types/post";
import { PaginationConfig } from "antd/es/pagination";

const defaultQuery = {
  page: 1,
  pageSize: 12,
};

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationConfig>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPosts = async (query: PostQuery = defaultQuery) => {
    try {
      setIsLoading(true);
      const data = await getPosts(query.page, query.pageSize);
      setPosts(data.posts);
      setPagination({
        current: query.page,
        pageSize: query.pageSize,
        total: data.total,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);
  return {
    posts,
    pagination,
    isLoading,
    handleGetPosts,
  };
};


export const usePostDetail = (id: number | undefined) => {
  const [postDetail, setPostDetail] = useState<Post | undefined>(undefined);

  const handleGetPostDetail = async (id: number) => {
    try {
      const post = await getPostDetail(id);
      setPostDetail(post);
    } catch (error) {
      console.error("Failed to fetch post details", error);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      handleGetPostDetail(id);
    }
  }, [id]);

  return {
    postDetail,
  };
};
