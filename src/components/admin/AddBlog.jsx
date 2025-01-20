import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "summernote/dist/summernote-lite.css";
import $ from "jquery"; // Summernote depends on jQuery
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "summernote/dist/summernote-lite.js";
import { addNewBlog } from "../server/admin/admin";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCountry } from "../redux/slices/BlogSlice";
import { DM_Sans } from "next/font/google";

const AddBlog = () => {
  const editorRef = useRef(null);
  const [blog, setBlog] = useState({
    countryName: "",
    bannerImage: null, // File object will be stored here
    img1: null, // File object for img1
    img2: null, // File object for img2
    blogHeading: "",
    blogDescription: "",
    blogContent: "",
  });

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setBlog((prev) => ({ ...prev, [field]: file }));
    }
  };

  useEffect(() => {
    // Initialize Summernote
    $(editorRef.current).summernote({
      height: 200,
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "italic", "underline", "clear"]],
        ["fontname", ["fontname"]],
        ["fontsize", ["fontsize"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["insert", ["link"]],
      ],
      callbacks: {
        onChange: (contents) => {
          setBlog((prev) => ({ ...prev, blogContent: contents }));
        },
      },
    });

    return () => {
      // Cleanup Summernote instance
      $(editorRef.current).summernote("destroy");
    };
  }, []);

  const updateField = (field, value) => {
    setBlog((prev) => ({ ...prev, [field]: value }));
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (blog.bannerImage === null || blog.img1 === null || blog.img2 === null) {
      toast.error("Please Select All The Images", {
        position: "top-left",
      });
    }
    if (
      blog.countryName === "" ||
      blog.blogContent === "" ||
      blog.blogDescription === "" ||
      blog.blogHeading === ""
    ) {
      toast.error("Please Select All The Images", {
        position: "top-left",
      });
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("countryName", blog.countryName);
    formData.append("bannerImage", blog.bannerImage); // The actual file for the banner image
    formData.append("img1", blog.img1); // The actual file for the first image
    formData.append("img2", blog.img2); // The actual file for the second image
    formData.append("blogHeading", blog.blogHeading);
    formData.append("blogDescription", blog.blogDescription);
    formData.append("blogContent", blog.blogContent);

    addNewBlog(formData)
      .then((data) => {
        dispatch(addCountry(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        {/* Fixed Fields */}
        <div className="mb-3">
          <label>Country Name</label>
          <input
            type="text"
            className="form-control"
            value={blog.countryName}
            onChange={(e) => updateField("countryName", e.target.value)}
            required
          />
        </div>
        <section className="relative flex flex-col">
          <div className="flex justify-center items-center flex-col gap-2">
            <label
              htmlFor="bannerImage"
              className="font-bold m-2 cursor-pointer"
            >
              Click Here To Add Banner Image
            </label>
            <img
              src={
                blog.bannerImage
                  ? URL.createObjectURL(blog.bannerImage)
                  : "/img/size/1200 X 600 px.png"
              }
              className="w-[1200px] max-h-[600px] h-auto"
              alt="1200 x 600"
            />
            <input
              id="bannerImage"
              type="file"
              className="hidden"
              required
              onChange={(e) => handleFileChange(e, "bannerImage")}
            />
          </div>

          <section className="flex flex-row justify-center lg:justify-between flex-wrap gap-4 ">
            <div className="mb-3 self-start">
              <label htmlFor="first" className="cursor-pointer font-bold">
                Click Here To Add First Blog Image
              </label>
              <input
                type="file"
                required
                id="first"
                className="hidden"
                onChange={(e) => handleFileChange(e, "img1")}
              />
              <img
                src={
                  blog.img1
                    ? URL.createObjectURL(blog.img1)
                    : "/img/size/400 X 400 px.png"
                }
                className="h-auto max-h-[300px] w-[300px]"
                alt="400 x 400"
              />
            </div>

            <div className="mb-3 self-end">
              <label htmlFor="second" className="cursor-pointer font-bold">
                Click Here To Add Second Blog Image
              </label>
              <input
                type="file"
                required
                id="second"
                className="hidden"
                onChange={(e) => handleFileChange(e, "img2")}
              />
              <img
                src={
                  blog.img2
                    ? URL.createObjectURL(blog.img2)
                    : "/img/size/400 X 400 px.png"
                }
                className="h-auto max-h-[300px] w-[300px]"
                alt="400 x 400"
              />
            </div>
          </section>
        </section>

        <div className="mb-3">
          <label>Blog Heading</label>
          <input
            type="text"
            className="form-control"
            value={blog.blogHeading}
            onChange={(e) => updateField("blogHeading", e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Blog Description</label>
          <textarea
            className="form-control"
            value={blog.blogDescription}
            onChange={(e) => updateField("blogDescription", e.target.value)}
            required
          />
        </div>

        {/* Single Blog Content Editor */}
        <h4>Blog Content</h4>
        <div className="mb-3">
          <div ref={editorRef} />
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-success">
            Submit Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
