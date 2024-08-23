import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import App from "./App";
import { getPostsMock } from "./services/mocks/post";



jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockResolvedValue({
  data: getPostsMock,
});

test("fetches and displays post data in post cards", async () => {
 
  render(<App />);


  await screen.findAllByTestId("card-post");

 
  expect(screen.getAllByTestId("card-post")).toHaveLength(
    getPostsMock.posts.length
  );
});

