
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  MapPin,
  CalendarDays,
  ArrowLeft,
  X,
  Save,
} from "lucide-react";

import { useAppContext } from "../context/AppContext";
import {
  resourceCategories,
  resourceLocations,
} from "../data/ownerData";

const initialFormData = {
  name: "",
  category: "Electronics",
  description: "",
  location: "Ahmedabad",
  condition: "Good",
  totalCopies: 1,
  maxBorrowDays: 5,
};

function ManageResources() {
  const { resources, addResource, updateResource, deleteResource } =
    useAppContext();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const resourceData = {
      ...formData,
      totalCopies: Number(formData.totalCopies),
      maxBorrowDays: Number(formData.maxBorrowDays),
    };

    if (editingId) {
      updateResource(editingId, resourceData);
    } else {
      addResource(resourceData);
    }

    resetForm();
  };

  const handleEdit = (resource) => {
    setFormData({
      name: resource.name,
      category: resource.category,
      description: resource.description,
      location: resource.location,
      condition: resource.condition,
      totalCopies: resource.totalCopies,
      maxBorrowDays: resource.maxBorrowDays,
    });

    setEditingId(resource.id);
    setShowForm(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (resourceId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resource?"
    );

    if (confirmed) {
      deleteResource(resourceId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Link
              to="/owner/dashboard"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-700"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold text-gray-900">
              Manage Resources
            </h1>

            <p className="mt-2 text-gray-500">
              Add, update, and manage your shared resources.
            </p>
          </div>

          {!showForm && (
            <button
              onClick={() => {
                setEditingId(null);
                setFormData(initialFormData);
                setShowForm(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              <Plus size={19} />
              Add Resource
            </button>
          )}
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? "Edit Resource" : "Add New Resource"}
              </h2>

              <button
                onClick={resetForm}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Resource Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Resource Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Professional DSLR Camera"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Category and Location */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category *
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                  >
                    {resourceCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Location *
                  </label>

                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                  >
                    {resourceLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your resource..."
                  rows={3}
                  required
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Condition, Copies and Borrow Days */}
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Condition
                  </label>

                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Total Copies *
                  </label>

                  <input
                    type="number"
                    name="totalCopies"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Max Borrow Days *
                  </label>

                  <input
                    type="number"
                    name="maxBorrowDays"
                    value={formData.maxBorrowDays}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
                >
                  <Save size={18} />
                  {editingId ? "Update Resource" : "Add Resource"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Resource Count */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Your Resources
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {resources.length} resources listed
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-3 text-green-700">
            <Package size={24} />
          </div>
        </div>

        {/* Resource List */}
        {resources.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <Package className="mx-auto text-gray-400" size={42} />

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No resources listed yet
            </h3>

            <p className="mt-2 text-gray-500">
              Start sharing with your community by adding a resource.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-5 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
            >
              Add Your First Resource
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {resource.category}
                    </span>

                    <h3 className="mt-3 text-lg font-bold text-gray-900">
                      {resource.name}
                    </h3>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      resource.status === "borrowed"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {resource.status}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                  {resource.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    {resource.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <Package size={16} />
                    {resource.totalCopies} copies
                  </p>

                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {resource.maxBorrowDays} days
                  </p>

                  <p>
                    Condition: <strong>{resource.condition}</strong>
                  </p>
                </div>

                <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleEdit(resource)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageResources;
