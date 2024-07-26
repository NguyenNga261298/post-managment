import React, { useState } from 'react';
import { Pagination } from 'antd';
import PostCard from './PostCard';
import './PostList.css';

const mockPosts = Array.from({ length: 20}, (_, i) => ({
  id: i + 1,
  title: `Lorem Ipsum ${i + 1}`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
}));

const PostList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedPosts = mockPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className="post-list">
        {paginatedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={mockPosts.length}
        onChange={handlePageChange}
        className="pagination"
      />
    </>
  );
};

export default PostList;
