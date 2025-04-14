import React, { useEffect, useState } from "react";
import {
  BookCheck,
  CalendarDays,
  FileInput,
  MapPin,
  ScrollText,
  Trophy,
  Users,
} from "lucide-react";
import EventSubmitModal from "../components/EventSubmitModal";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

const EventDetail = () => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // getting id from url
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await axiosInstance.get(`/events/${id}`);
      setEvent(response.data);
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (!event) return;

    const endDate = new Date(event.start_date).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setCountDown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountDown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  const formatNumber = (num) => String(num).padStart(2, "0");

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <section className="pt-14 text-xl">
      <div className="container mx-auto">
        <div className="text-center text-4xl my-10 font-semibold">
          {event.title}
        </div>
        <div className="flex gap-10">
          <img
            src="/eventdefault.png"
            alt="#"
            className="w-1/2 h-[500px] object-cover rounded-md"
          />
          <div className="bg-accent/10 border-2 border-accent rounded-md w-1/2 flex flex-col gap-2 justify-around pl-8 py-2 shadow">
            <div className="flex items-center gap-4">
              <CalendarDays />
              Start Date - {event.start_date}
            </div>
            <div className="flex items-center gap-4">
              <CalendarDays />
              End Date - {event.end_date}
            </div>
            <div className="flex items-center gap-4">
              <MapPin />
              Location - {event.location}
            </div>
            <div className="flex items-center gap-4">
              <ScrollText />
              Application Deadline - {event.application_deadline}
            </div>
            <div className="flex items-center gap-4">
              <FileInput />
              Project Submission Deadline - {event.project_submission_deadline}
            </div>
            <div className="flex items-center gap-4">
              <Users />
              Max-participants- {event.max_participants}
            </div>
            <div className="flex items-center gap-4">
              <Trophy />
              Reward - {event.reward}
            </div>
          </div>
        </div>

        <div className="text-pretty my-10">{event.description}</div>

        <div className="p-4 bg-white border-2 border-primary rounded-md shadow">
          <div className="font-semibold mb-2 flex items-center gap-4">
            Requirement <BookCheck />
          </div>
          <div className="text-neutral-500">
            {event.requirements ? event.requirements : "No requirements"}
          </div>
        </div>

        <div className="my-10 flex justify-between items-end">
          {!(
            countDown.days === 0 &&
            countDown.hours === 0 &&
            countDown.minutes === 0 &&
            countDown.seconds === 0
          ) && (
            <div className="p-4 flex flex-col gap-2 items-center rounded-md">
              <div>Event Will Start In</div>

              <div className="w-full py-4 bg-white shadow rounded-md text-center">
                {countDown.days ? (
                  <>{countDown.days} days</>
                ) : (
                  `${formatNumber(countDown.hours)}
                : ${formatNumber(countDown.minutes)} :
                ${formatNumber(countDown.seconds)}`
                )}
              </div>
            </div>
          )}

          {countDown.days === 0 &&
          countDown.hours === 0 &&
          countDown.minutes === 0 &&
          countDown.seconds === 0 ? (
            <div className="px-8 py-4 shadow text-secondary bg-error rounded-md">
              <button className=" cursor-not-allowed">
                Application Closed
              </button>
            </div>
          ) : (
            <div className="px-8 py-4 shadow text-secondary bg-accent rounded-md">
              <button
                className=" cursor-pointer"
                onClick={() => setIsSubmitModalOpen(true)}
              >
                Apply Event
              </button>
            </div>
          )}
        </div>
      </div>
      <EventSubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        eventId={id}
      />
    </section>
  );
};

export default EventDetail;
