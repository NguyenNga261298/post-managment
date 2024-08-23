import React, { useState } from 'react';
import { Button, Modal, notification, Pagination } from 'antd';
import PostCard from './PostCard';
import './PostList.css';
import { useGetPosts } from '../../hooks/post';
import PostForm from './PostForm';
import { PlusOutlined } from '@ant-design/icons';



// const mockPosts = Array.from({ length: 20}, (_, i) => ({
//   id: i + 1,
//   title: `Lorem Ipsum ${i + 1}`,
//   description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
// }));

const PostList: React.FC = () => {
  const [postToEditId, setPostToEditId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { posts, pagination, handleGetPosts } = useGetPosts();
  const pageSize = 12;

  const handlePageChange = (page: number) => {
    handleGetPosts({ page: page, pageSize: pagination.pageSize });
    console.log(posts)
  };

  const closeModal = () => {
    setPostToEditId(undefined);
    setIsModalOpen(false);
  };

  const handleEditPost = (id: number) => {
    setPostToEditId(id);
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAfterSuccess = (isDeleted?: boolean) => {
    if (!isDeleted) closeModal();

    let msg = "Delete post successfully!";
    if (!isDeleted) {
      if (postToEditId) {
        msg = "Update post successfully!";
      } else {
        msg = "Add new post successfully!";
      }
    }
    notification.success({
      message: "Success",
      description: msg,
    });

    let newQuery; 

    
    if (postToEditId || isDeleted) {
      newQuery = { page: pagination.current, pageSize: pagination.pageSize };
    }

    handleGetPosts(newQuery);
  };

  return (
    <>
      <Button
        className="btn-add"
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        data-testid="btn-create-new-post"
      >
        Add New Post
      </Button>

      <Modal
        title={postToEditId ? "Edit Post" : "Add New Post"}
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        width={800}
        data-testid="modal"
      >
        <PostForm
          postToEditId={postToEditId}
          handleAfterSuccess={handleAfterSuccess}
        />
      </Modal>

      <div className="post-list">
        {posts.map(post => (
          <PostCard key={post.id} post={post} handleEditPost={handleEditPost} handleAfterSuccess={handleAfterSuccess} />
        ))}
      </div>
      <Pagination
        current={pagination.current}
        pageSize={pageSize}
        total={pagination.total}
        onChange={handlePageChange}
        className="pagination"
      />
    </>
  );
};

export default PostList;
