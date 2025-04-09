import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventById,
  updateEvent,
  deleteEvent,
} from "../store/slices/eventSlice";
import { showToast } from "../utils/toast";
import GeneralTab from "../components/organizer/insights/GeneralTab";
import ApplicationsTab from "../components/organizer/insights/ApplicationsTab";
import TeamsTab from "../components/organizer/insights/TeamsTab";
import ChatTab from "../components/organizer/insights/ChatTab";

const TABS = ["general", "applications", "teams", "chat"];

const INITIAL_FORM_STATE = {
  title: "",
  description: "",
  location: "",
  max_participants: "",
  start_date: "",
  end_date: "",
  application_deadline: "",
  project_submission_deadline: "",
  reward: "",
  requirements: "",
  img: null,
};

const EventInsights = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEvent, loading } = useSelector((state) => state.events);

  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId));
    }
  }, [dispatch, eventId]);

  useEffect(() => {
    if (!currentEvent) return;

    setFormData({
      title: currentEvent.title || "",
      description: currentEvent.description || "",
      location: currentEvent.location || "",
      max_participants: currentEvent.max_participants || "",
      start_date: currentEvent.start_date || "",
      end_date: currentEvent.end_date || "",
      application_deadline: currentEvent.application_deadline || "",
      project_submission_deadline:
        currentEvent.project_submission_deadline || "",
      reward: currentEvent.reward || "",
      requirements: currentEvent.requirements || "",
      img: currentEvent.img || null,
    });

    setIsDirty(false);
  }, [currentEvent]);

  const handleChange = useCallback((e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setIsDirty(true);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      const submitData = new FormData();

      try {
        // Handle image
        if (formData.img instanceof File) {
          submitData.append("img", formData.img);
        } else if (typeof formData.img === "string" && formData.img) {
          const response = await fetch(formData.img);
          const blob = await response.blob();
          const fileName = formData.img.split("/").pop();
          const file = new File([blob], fileName, { type: blob.type });
          submitData.append("img", file);
        }

        // Add form fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "img" && value !== null && value !== "") {
            submitData.append(key, value);
          }
        });

        await dispatch(
          updateEvent({ eventId, eventData: submitData })
        ).unwrap();
        showToast.success("Event updated successfully");
        setIsDirty(false);
      } catch (error) {
        showToast.error(
          typeof error === "string" ? error : "Failed to update event"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [dispatch, eventId, formData]
  );

  const handleDelete = useCallback(async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteEvent(eventId)).unwrap();
      showToast.success("Event deleted successfully");
      navigate("/organizer/events");
    } catch (error) {
      showToast.error(error || "Failed to delete event");
    }
  }, [dispatch, eventId, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleTabChange = useCallback(
    (tab) => {
      if (
        !isDirty ||
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        setActiveTab(tab);
      }
    },
    [isDirty]
  );

  // Memoize content to prevent unnecessary rerenders
  const renderTabContent = useMemo(() => {
    if (loading && !currentEvent) {
      return <div className="p-8">Loading...</div>;
    }

    switch (activeTab) {
      case "general":
        return (
          <GeneralTab
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            isSubmitting={isSubmitting}
            isDirty={isDirty}
          />
        );
      case "applications":
        return <ApplicationsTab />;
      case "teams":
        return <TeamsTab />;
      case "chat":
        return <ChatTab />;
      default:
        return null;
    }
  }, [
    activeTab,
    formData,
    handleChange,
    handleSubmit,
    handleDelete,
    isSubmitting,
    isDirty,
    loading,
    currentEvent,
  ]);

  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      {/* Header */}
      <div className="flex-none">
        <div className="flex items-center gap-3 mb-5 pt-3">
          <Link to="/organizer/events">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-medium">Event Insights</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 px-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-1 py-2 capitalize cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">{renderTabContent}</div>
    </div>
  );
};

export default EventInsights;
