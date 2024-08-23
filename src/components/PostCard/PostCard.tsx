import React, { useState } from 'react';
import { Card, Popconfirm, PopconfirmProps } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './PostCard.css';
import { Post } from '../../types/post';
import { deletePost } from '../../services/apis/post';

interface PostCardProps {
  post: Post;
  handleEditPost: (id: number) => void;
  handleAfterSuccess: (isDeleted?: boolean) => void;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const { handleEditPost, post, handleAfterSuccess } = props;
  const [expanded, setExpanded] = useState(false);

  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };

  const handleConfirmDelete: PopconfirmProps["onConfirm"] = async () => {
    // Delete post
    try {
      await deletePost(post.id);
    } finally { 
      handleAfterSuccess(true);
     }
  };

  return (
    <Card
      data-testid="card-post" 
      title={`[${post.id}] ${post.title}`}
      actions={[
        <EditOutlined key="edit" onClick={() => handleEditPost(post.id)} />,
        <Popconfirm
          key="delete"
          title="Delete Post"
          description="Are you sure to delete this post?"
          onConfirm={handleConfirmDelete}
          okText="Confirm"
          cancelText="Cancel"
        >
          <DeleteOutlined data-testid="icon-delete-post" />
        </Popconfirm>,
      ]}
    > 
      <p>
        {expanded ? post.description : `${post.description.substring(0, 100)}...`}
        <span className="expand-toggle" onClick={handleExpandToggle}>
          {expanded ? ' Show less' : ' Show more'}
        </span>
      </p>
    </Card>
  );
};

export default PostCard;
