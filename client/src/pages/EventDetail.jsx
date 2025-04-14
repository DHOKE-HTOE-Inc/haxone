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

const EventDetail = () => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const endDate = new Date(2025, 3, 15, 0, 0, 0).getTime();

  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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
  }, [endDate]);

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <section className="pt-14 text-xl">
      <div className="container mx-auto">
        <div className="text-center text-4xl my-10 font-semibold">
          Tech Innovators Summit 2025
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
              Start Date - Aug 10, 2025
            </div>
            <div className="flex items-center gap-4">
              <CalendarDays />
              End Date - Aug 14, 2025
            </div>
            <div className="flex items-center gap-4">
              <MapPin />
              Location - Bago, Myanmar
            </div>
            <div className="flex items-center gap-4">
              <ScrollText />
              Application Deadline - July 10, 2025
            </div>
            <div className="flex items-center gap-4">
              <FileInput />
              Project Submission Deadline - Aug 13, 2025
            </div>
            <div className="flex items-center gap-4">
              <Users />
              Max-participants- 250
            </div>
            <div className="flex items-center gap-4">
              <Trophy />
              Reward - $1000
            </div>
          </div>
        </div>

        <div className="text-pretty my-10">
          <span className="font-semibold">Tech Innovators Summit 2025</span>{" "}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
          aspernatur quo, dicta cumque, consectetur optio fugit voluptate
          necessitatibus natus voluptatibus veritatis molestiae nam officia
          dignissimos excepturi reiciendis praesentium asperiores quibusdam
          consequatur accusamus libero! Tempore nisi blanditiis molestias alias
          saepe tenetur pariatur? Asperiores incidunt illum, magni minima
          repudiandae perferendis officiis vitae? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Soluta, accusantium? Eos, fugiat quos
          nam magni deserunt esse. Numquam facere minima delectus voluptas illo,
          nihil debitis, incidunt eius error, ipsum distinctio.
        </div>

        <div className="p-4 bg-white border-2 border-primary rounded-md shadow">
          <div className="font-semibold mb-2 flex items-center gap-4">
            Requirement <BookCheck />
          </div>
          <div className="text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem hic, eveniet rem neque magnam laudantium est
            reprehenderit eum error doloribus temporibus fuga beatae repellat
            voluptates ullam, sit corporis accusamus vitae?Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Ducimus inventore vitae deleniti
            at tempora illo sequi consequatur eveniet nam iste perferendis modi
            delectus officia in voluptate, fuga voluptatibus quia maiores.
          </div>
        </div>

        <div className="my-10 flex justify-between items-end">
          {countDown.days === 0 &&
          countDown.hours === 0 &&
          countDown.minutes === 0 &&
          countDown.seconds === 0 ? (
            <div></div>
          ) : (
            <>
              <div className="p-4 flex flex-col gap-2 items-center rounded-md">
                <div>Event Will Start In</div>
                <div className="w-full py-4 bg-white shadow rounded-md text-center">
                  {formatNumber(countDown.days)} :{" "}
                  {formatNumber(countDown.hours)} :{" "}
                  {formatNumber(countDown.minutes)} :{" "}
                  {formatNumber(countDown.seconds)}
                </div>
              </div>
            </>
          )}
          {countDown.days === 0 &&
          countDown.hours === 0 &&
          countDown.minutes === 0 &&
          countDown.seconds === 0 ? (
            <div className="px-8 py-4 shadow text-secondary bg-error rounded-md ">
              <button className=" cursor-not-allowed">
                Application Closed
              </button>
            </div>
          ) : (
            <>
              <div className="px-8 py-4 shadow text-secondary bg-accent rounded-md">
                <button
                  className=" cursor-pointer"
                  onClick={() => setIsSubmitModalOpen(true)}
                >
                  Apply Event
                </button>
              </div>

              <EventSubmitModal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
