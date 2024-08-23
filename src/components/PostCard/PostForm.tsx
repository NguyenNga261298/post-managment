import { Button, Form, FormProps, Input } from "antd";
import { useEffect } from "react";
import { Post } from "../../types/post";
import { createPost, updatePost } from "../../services/apis/post";
import { usePostDetail } from '../../hooks/post';


interface PostFormProps {
  postToEditId?: number;
  handleAfterSuccess: (isDeleted?: boolean) => void;
}

const PostForm: React.FC<PostFormProps> = (props) => {
  const [form] = Form.useForm();
  const { postToEditId, handleAfterSuccess } = props;
  const { postDetail } = usePostDetail(postToEditId);

  useEffect(() => {
    if (postDetail) {
      form.setFieldsValue({
        title: postDetail.title,
        description: postDetail.description,
      });
    } else {
      form.resetFields(); 
    }
  }, [postDetail, form]);
  


  const handleConfirmUpsert: FormProps<Post>["onFinish"] = async (
    values
  ) => {
    // Update post
    if (postToEditId) {
      await updatePost(postToEditId, values);
    }
    // Create post
    else {
      await createPost(values);
    }
    handleAfterSuccess();
  };

  return (
    <Form
        form={form}
        name="post-form"
        layout="vertical"
        onFinish={handleConfirmUpsert}
        autoComplete="off"
      >
        <Form.Item<Post>
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please input the title!",
            },
            { max: 100, message: "The maximum length of title is 100!" },
          ]}
        >
          <Input placeholder="Enter title" data-testid="input-title" />
        </Form.Item>

        <Form.Item<Post>
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please input the description!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter description"
            autoSize={{ minRows: 4 }}
            data-testid="input-description"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            data-testid="btn-submit-post-form"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
  );
};

export default PostForm;
