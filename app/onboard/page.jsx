"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useArtists } from "../context/ArtistContext"; // make sure to create and use ArtistContext
import { useRouter } from "next/navigation";

const categoryOptions = ["Singer", "Dancer", "DJ", "Speaker"];
const languageOptions = [
  "Hindi",
  "English",
  "Punjabi",
  "Gujarati",
  "Marathi",
  "Tamil",
];
const feeOptions = ["Below ₹20,000", "₹20,000 - ₹40,000", "Above ₹40,000"];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  bio: Yup.string()
    .min(10, "Bio must be at least 10 characters")
    .required("Bio is required"),
  category: Yup.array().min(1, "Select at least one category"),
  languages: Yup.array().min(1, "Select at least one language"),
  feeRange: Yup.string().required("Fee range is required"),
  location: Yup.string().required("Location is required"),
});

export default function ArtistOnboardPage() {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });

  const { addArtist } = useArtists();

  const onSubmit = (data) => {
    addArtist({ ...data, image: imagePreview });
    toast.success("Artist submitted successfully!");
    router.push("/dashboard"); // this should go to manager dashboard
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleNext = async () => {
    let valid = false;
    if (step === 1) valid = await trigger(["name", "bio", "location"]);
    if (step === 2)
      valid = await trigger(["category", "languages", "feeRange"]);
    if (valid) setStep(step + 1);
  };

  const steps = ["Basic Info", "Preferences", "Upload"];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg shadow-lg rounded-xl px-8 py-10">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 tracking-tight">
          Artist Onboarding
        </h1>

        {/* Step Progress Indicator */}
        <div className="flex justify-between mb-12">
          {steps.map((label, index) => (
            <div key={label} className="flex-1 text-center">
              <div
                className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-bold transition ${
                  step === index + 1
                    ? "bg-indigo-600 text-white scale-105 shadow-lg"
                    : step > index + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {index + 1}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">{label}</p>
            </div>
          ))}
        </div>

        {/* Form Start */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1 */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Name
                </label>
                <input
                  {...register("name")}
                  className="w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter full name"
                />
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  className="w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Tell us about yourself"
                />
                <p className="text-red-500 text-sm">{errors.bio?.message}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Location
                </label>
                <input
                  {...register("location")}
                  className="w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="City or region"
                />
                <p className="text-red-500 text-sm">
                  {errors.location?.message}
                </p>
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Category
                </label>
                <div className="flex flex-wrap gap-4">
                  {categoryOptions.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        value={cat}
                        {...register("category")}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
                <p className="text-red-500 text-sm">
                  {errors.category?.message}
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Languages Spoken
                </label>
                <div className="flex flex-wrap gap-4">
                  {languageOptions.map((lang) => (
                    <label
                      key={lang}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        value={lang}
                        {...register("languages")}
                      />
                      {lang}
                    </label>
                  ))}
                </div>
                <p className="text-red-500 text-sm">
                  {errors.languages?.message}
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Fee Range
                </label>
                <select
                  {...register("feeRange")}
                  className="w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select fee range</option>
                  {feeOptions.map((fee) => (
                    <option key={fee} value={fee}>
                      {fee}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-sm">
                  {errors.feeRange?.message}
                </p>
              </div>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Profile Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImagePreview}
                className="text-sm mt-1"
              />
              {imagePreview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-28 w-28 rounded-full object-cover ring-2 ring-indigo-500 shadow"
                  />
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-sm font-semibold bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                ⬅ Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
              >
                Next ➡
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
              >
                ✅ Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
