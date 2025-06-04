import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import CreatePost from "../pages/CreatePost";
import Profile from "../pages/Profile";
import BlogPost from "../components/BlogPost";

const flowersImage = "mock-image-url.jpg";

// mock backend url
jest.mock('../../env.js', () => ({
  getBackendUrl: () => 'http://localhost:8000',
}));

// mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => jest.fn(),
    MemoryRouter: original.MemoryRouter,
    Routes: original.Routes,
    Route: original.Route
  };
});

// simulate login
beforeEach(() => {
  localStorage.setItem("authToken", "mock-token");
  jest.clearAllMocks();
});

afterEach(() => {
  localStorage.clear();
});

const mockUser = {
  _id: "user123",
  name: "s",
  email: "s@s",
  city: "a",
  state: "CA",
  profile_picture: null
};

const mockUploadedImage = {
  imageUrl: flowersImage,
  publicId: "abc123"
};

const mockSavedPost = {
  _id: "post456",
  title: "Test Title",
  content: "Test Content",
  image: flowersImage,
  createdAt: new Date().toISOString()
};

test("submits a new post from CreatePost", async () => {
  global.fetch = jest
    .fn()
    // GET /users
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: mockUser })
    })
    // POST /upload
    .mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          imageUrl: flowersImage,
          publicId: "abc123"
        })
    })
    // POST /api/posts
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSavedPost)
    });

  render(
    <MemoryRouter initialEntries={["/createPost"]}>
      <Routes>
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </MemoryRouter>
  );

  // Fill out form
  fireEvent.change(
    screen.getByPlaceholderText(/enter post title/i),
    {
      target: { value: "Test Title" }
    }
  );
  fireEvent.change(
    screen.getByPlaceholderText(/enter post content/i),
    {
      target: { value: "Test Content" }
    }
  );

  const file = new File(["dummy"], "flowers.png", {
    type: "image/png"
  });
  const fileInput = document.querySelector(
    "input#image-upload"
  );
  fireEvent.change(fileInput, { target: { files: [file] } });

  fireEvent.click(screen.getByText(/publish blog post/i));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/upload"),
      expect.anything()
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/posts"),
      expect.objectContaining({ method: "POST" })
    );
  });
});

test("displays post in Profile page", async () => {
  // Mock backend post fetch
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: mockUser })
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockSavedPost])
    });

  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/profile",
          state: { newPost: mockSavedPost } // simulate navigation state
        }
      ]}
    >
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(
      screen.getByText("Test Content")
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/blog post visual/i)
    ).toHaveAttribute("src", flowersImage);
    expect(screen.getByText("s")).toBeInTheDocument();
    expect(screen.getByText("a, CA")).toBeInTheDocument();
  });
});

test("shows image preview when a image file is selected", async () => {
  const alertSpy = jest
    .spyOn(window, "alert")
    .mockImplementation(() => {});
  console.error = jest.fn(); // silence expected console output

  // Add a real fetch mock for /users and /upload
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ user: { _id: "123", city: "a" } })
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          imageUrl: "mock-image-url.jpg",
          publicId: "abc123"
        })
    });

  render(
    <MemoryRouter initialEntries={["/createPost"]}>
      <Routes>
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </MemoryRouter>
  );

  const file = new File(["dummy image"], "test.png", {
    type: "image/png"
  });
  const input = document.querySelector("input#image-upload");

  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => {
    const img = screen.getByAltText(/preview/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src");
  });

  alertSpy.mockRestore();
});

test("shows alert when image upload fails", async () => {
  const alertSpy = jest
    .spyOn(window, "alert")
    .mockImplementation(() => {});
  console.error = jest.fn();

  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: mockUser })
    })
    .mockResolvedValueOnce({
      ok: false,
      status: 500
    });

  render(
    <MemoryRouter initialEntries={["/createPost"]}>
      <Routes>
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </MemoryRouter>
  );

  const file = new File(["fail"], "broken.png", {
    type: "image/png"
  });
  const input = document.querySelector("input#image-upload");
  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      "Image upload failed."
    );
  });

  alertSpy.mockRestore();
});

test("shows alert when blog post submission fails", async () => {
  const alertSpy = jest
    .spyOn(window, "alert")
    .mockImplementation(() => {});
  console.error = jest.fn();

  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: mockUser })
    })
    // POST /upload success
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUploadedImage)
    })
    // POST /api/posts fails
    .mockResolvedValueOnce({
      ok: false,
      status: 500
    });

  render(
    <MemoryRouter initialEntries={["/createPost"]}>
      <Routes>
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(
    screen.getByPlaceholderText(/enter post title/i),
    {
      target: { value: "Oops Title" }
    }
  );
  fireEvent.change(
    screen.getByPlaceholderText(/enter post content/i),
    {
      target: { value: "Oops Content" }
    }
  );

  const file = new File(["real"], "ok.png", {
    type: "image/png"
  });
  fireEvent.change(
    document.querySelector("input#image-upload"),
    {
      target: { files: [file] }
    }
  );

  fireEvent.click(screen.getByText(/publish blog post/i));

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      "Could not save your post."
    );
  });

  alertSpy.mockRestore();
});

test("deletes a blog post through the popup", async () => {
  localStorage.setItem("authToken", "mock-token");
  const alertSpy = jest
    .spyOn(window, "alert")
    .mockImplementation(() => {});
  console.error = jest.fn();

  const postToDelete = {
    _id: "post123",
    title: "Delete Me",
    content: "To be deleted",
    image: "mock-image-url.jpg",
    createdAt: new Date().toISOString()
  };

  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          user: {
            _id: "user123",
            name: "s",
            email: "s@s",
            city: "a",
            state: "CA",
            profile_picture: null
          }
        })
    })
    // GET /api/posts
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([postToDelete])
    })
    // DELETE /api/posts/:id
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });

  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MemoryRouter>
  );

  // Wait for post to appear
  await waitFor(() => {
    expect(screen.getByText("Delete Me")).toBeInTheDocument();
  });

  // Open delete menu
  fireEvent.click(screen.getByAltText(/menu/i));
  fireEvent.click(screen.getByText(/delete blog post/i));
  fireEvent.click(screen.getByText("Delete"));

  // Post should disappear
  await waitFor(() => {
    expect(
      screen.queryByText("Delete Me")
    ).not.toBeInTheDocument();
  });

  alertSpy.mockRestore();
});

test("shows error when deleting post fails", async () => {
  const alertSpy = jest
    .spyOn(window, "alert")
    .mockImplementation(() => {});
  console.error = jest.fn();

  const mockPostToDelete = {
    _id: "post123",
    title: "Test Title",
    content: "Test Content",
    image: "mock-image-url.jpg",
    createdAt: new Date().toISOString()
  };

  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: mockUser })
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockPostToDelete])
    });

  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MemoryRouter>
  );

  // Wait for post to appear
  await waitFor(() => {
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: false,
    json: () =>
      Promise.resolve({ error: "Mock deletion error" })
  });

  fireEvent.click(screen.getByAltText("Menu"));
  fireEvent.click(screen.getByText("Delete Blog Post"));
  fireEvent.click(screen.getByText("Delete"));

  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(
      "Error deleting post:",
      "Mock deletion error"
    );
  });

  alertSpy.mockRestore();
});

test("shows error when fetching posts fails", async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: mockUser }),
    })
    .mockResolvedValueOnce({
      ok: false, // simulate failed posts fetch
      status: 500,
      json: () => Promise.resolve({ error: "Internal Server Error" }),
    });

  console.error = jest.fn();

  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(expect.any(Error));
  });
});

test("shows user profile picture when available", async () => {
  const userWithPic = { ...mockUser, profile_picture: "pic.jpg" };

  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: userWithPic }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockSavedPost]),
    });

  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByAltText("Profile")).toHaveAttribute("src", "pic.jpg");
  });
});

test("renders delete confirmation popup", () => {
  render(
    <BlogPost
      title="Sample"
      content="This is a sample post"
      date="2024-06-01T00:00:00.000Z"
      isOwner={true}
      onDelete={() => {}}
    />
  );

  fireEvent.click(screen.getByAltText("Menu"));
  fireEvent.click(screen.getByText(/Delete Blog Post/i));

  expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
});
