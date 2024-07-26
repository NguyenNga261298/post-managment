import React, { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './PostCard.css';

interface Post {
  id: number;
  title: string;
  description: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      title={`[${post.id}] ${post.title}`}
      actions={[
        <EditOutlined key="edit" />,
        <DeleteOutlined key="delete" />,
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
