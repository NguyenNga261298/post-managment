import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import App from "./App";
import { getPostsMock } from "./services/mocks/post";
import userEvent from '@testing-library/user-event'



jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface PostType { id: number; title: string; description: string; }

mockedAxios.get.mockImplementation(() => {
  return Promise.resolve({
    data: getPostsMock
  });
})

mockedAxios.post.mockImplementation((_, data) => {
  const postData = data as PostType;
  const newItem = {
    id: getPostsMock.total + 1,
    title: postData.title,
    description: postData.description,
  }
  getPostsMock.posts.push(newItem)
  getPostsMock.total += 1
  return Promise.resolve({
    data: newItem
  });
})

mockedAxios.put.mockImplementation((url, data) => {
  const postData = data as PostType;
  const paths = url.split("/");
  const id = Number(paths[paths.length-1]);
  for (let i = 0; i < getPostsMock.posts.length; i++) {
    if (getPostsMock.posts[i].id == id) {
      getPostsMock.posts[i].title = postData.title;
      getPostsMock.posts[i].description = postData.description;
      return Promise.resolve({
        data: getPostsMock.posts[i]
      });
    }
  }
  return Promise.resolve({
    data: {}
  });
})

mockedAxios.delete.mockImplementation((url) => {
  const paths = url.split("/");
  const id = Number(paths[paths.length-1]);
  for (let i = 0; i < getPostsMock.posts.length; i++) {
    if (getPostsMock.posts[i].id == id) {
      getPostsMock.posts = getPostsMock.posts.filter((val) => val.id != id)
      getPostsMock.total = getPostsMock.posts.length;
      return Promise.resolve({data: {}});
    }
  }
  return Promise.resolve({
    data: {}
  });
})

test("fetches and displays post data in post cards", async () => {
  render(<App />);

  await screen.findAllByTestId("card-post");

  expect(screen.getAllByTestId("card-post")).toHaveLength(
    getPostsMock.posts.length
  );
});

test("Display validation error when submitting post form with empty values", async () => {
  render(<App />);

  const createNewPostButton = await screen.findByTestId('btn-create-new-post');
  await userEvent.click(createNewPostButton);

  // Wait for the modal to appear
  const modal = await screen.findByTestId('modal');
  expect(modal).toBeInTheDocument();

  // Find and click the "Submit" button within the modal
  const submitButton = await screen.findByTestId('btn-submit-post-form');
  expect(submitButton).toBeInTheDocument();
  await userEvent.click(submitButton);

  // Assert that the validation error message is displayed
  expect(getPostsMock.posts.length).toEqual(2);
})

test('Display validation error when submitting post form with title that exceeds the maximum length (100)', async () => {
  render(<App />);

  const createNewPostButton = await screen.findByTestId('btn-create-new-post');
  await userEvent.click(createNewPostButton);

  // Wait for the modal to appear
  const modal = await screen.findByTestId('modal');
  expect(modal).toBeInTheDocument();

  // Find the title input and enter a title that exceeds the maximum length
  const titleInput = await screen.findByTestId('input-title');
  await userEvent.type(titleInput, 'A'.repeat(101)); // Enter a title of 101 characters

  // Find and click the "Submit" button within the modal
  const submitButton = await screen.findByTestId('btn-submit-post-form');
  await userEvent.click(submitButton);

  // Assert that the validation error message is displayed
  expect(screen.getByText('The maximum length of title is 100!')).toBeInTheDocument();
});

test("Create new post successfully", async () => {
  render(<App />);

  const createNewPostButton = await screen.findByTestId('btn-create-new-post');
  await userEvent.click(createNewPostButton);

  // Wait for the modal to appear
  const modal = await screen.findByTestId('modal');
  expect(modal).toBeInTheDocument();

  // Find the title input and enter a title
  const titleInput = await screen.findByTestId('input-title');
  await userEvent.type(titleInput, 'A'.repeat(50));

  const descInput = await screen.findByTestId('input-description');
  await userEvent.type(descInput, 'A'.repeat(50));

  // Find and click the "Submit" button within the modal
  const submitButton = await screen.findByTestId('btn-submit-post-form');
  await userEvent.click(submitButton);

  expect(await screen.getAllByTestId("card-post")).toHaveLength(3);
})

test("Update post successfully", async () => {
  render(<App />);

  await screen.findAllByTestId("card-post");

  const editBtns = await screen.getAllByTestId('edit-btn');
  await userEvent.click(editBtns[0]);

  // Wait for the modal to appear
  const modal = await screen.findByTestId('modal');
  expect(modal).toBeInTheDocument();


  // Find the title input and enter a title
  const titleInput = await screen.findByTestId('input-title');
  await userEvent.type(titleInput, 'aaaa');

  const descInput = await screen.findByTestId('input-description');
  await userEvent.type(descInput, 'bbbb');

  const submitButton = await screen.findByTestId('btn-submit-post-form');
  await userEvent.click(submitButton);

  await screen.getAllByTestId("card-post");
  expect(getPostsMock.posts[0].title).toEqual('aaaa');
  expect(getPostsMock.posts[0].description).toEqual('bbbb');
})

test("Delete post successfully", async() => {
  render(<App />);

  await screen.findAllByTestId("card-post");

  const beforeLength = getPostsMock.posts.length;

  const deleteBtns = await screen.getAllByTestId('icon-delete-post');
  await userEvent.click(deleteBtns[0]);
  
  const confirmBtn = await screen.getByText("Confirm");
  await userEvent.click(confirmBtn);

  expect(getPostsMock.posts.length).toEqual(beforeLength-1);
})