import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import Animation from "./Animation";

interface Schedule {
  id?: string;
  doctorId: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

interface Props {
  showCancel?: boolean;
  callbackFn?: (...args: unknown[]) => unknown;
}

interface NewSchedule {
  doctor: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

const ScheduleForm: React.FC<Props> = () => {
  const [schedules, setSchedules] = useState<Array<Schedule>>();
  const [doctorId, setDoctorId] = useState<string>();
  const [day, setDay] = useState<string>();
  const [startTime, setStartTime] = useState<string>(new Date().toString());
  const [endTime, setEndTime] = useState<string>(new Date().toString());

  // const addSchedule = trpc.schedule.addSchedule.useMutation();
  const addSchedules = trpc.schedule.addSchedules.useMutation();
  const deleteSchedule = trpc.schedule.deleteSchedule.useMutation();
  const doctors = trpc.doctor.doctors.useQuery();
  const getSchedules = trpc.schedule.getSchedules.useQuery(
    {
      doctorId: doctorId ? doctorId : ""
    },
    {
      onSuccess: (data) => {
        if (doctorId) {
          const stateData: Schedule[] = [];
          data.forEach((d) =>
            stateData.push({
              id: d.id.toString(),
              doctorId: d.doctorId,
              day_of_week: d.day_of_week,
              start_time: d.start_time.toString(),
              end_time: d.end_time.toString()
            })
          );
          setSchedules(stateData);
        }
      }
    }
  );

  const delSchedule = async (sch: Schedule) => {
    if (sch.id) {
      await deleteSchedule.mutateAsync(sch.id);
      getSchedules.refetch();
    }
  }

  useEffect(() => {
    getSchedules.refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId]);

  const newSchedules = async () => {
    const newSchedules: NewSchedule[] = [];
    schedules?.forEach((schedule) =>
      newSchedules.push({
        doctor: schedule.doctorId,
        day_of_week: schedule.day_of_week,
        start_time: schedule.start_time,
        end_time: schedule.end_time
      })
    );
    if (schedules && schedules.length) {
      addSchedules.mutate(newSchedules);
    }
    await addSchedules.mutateAsync(newSchedules);
  };

  const appendSchedule = () => {
    console.log("doc", doctorId, day, startTime, endTime);
    if (doctorId && day && endTime && startTime) {
      console.log("inside");
      const data: Schedule = {
        doctorId: doctorId,
        day_of_week: day,
        end_time: endTime,
        start_time: startTime
      };
      let s = schedules;
      if (schedules?.length) {
        s?.push(data);
      } else {
        s = [data];
      }
      setSchedules(s);

      setDay("123");
      setEndTime(new Date().toString());
      setStartTime(new Date().toString());
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <form className="space-y-4 md:space-y-6" action="#">
            <div className="flex items-center justify-center gap-3">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Doctors name:
              </label>
              <select
                onChange={(e) => setDoctorId(e.target.value)}
                className="focus:ring-primary-600 focus:border-primary-600 block w-1/2 rounded-lg border-r border-t border-b border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                defaultValue={"123"}
              >
                <option disabled value={"123"}>
                  Select a Doctor
                </option>
                {doctors && doctors.data
                  ? doctors.data.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        Dr. {doc.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 text-white">
              Items
              {schedules?.map((sch, index) => (
                <div
                  key={index}
                  className="flex w-full flex-row justify-between gap-3 text-white"
                >
                  <div className="flex flex-row justify-center items-center">{sch.day_of_week}</div>
                  <div className="flex flex-row justify-center items-center">
                    {new Date(sch.start_time).toLocaleString().toString()}
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    {new Date(sch.end_time).toLocaleString().toString()}
                    <XMarkIcon onClick={() => delSchedule(sch)} className="bg-red-50 dark:bg-red-700 ml-3 w-9 rounded-lg border border-l border-gray-300 p-2.5 text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-3">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Day
                </label>
                <select
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-r border-t border-b border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  defaultValue="123"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option disabled value="123">
                    Select a Day
                  </option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Time
                </label>
                <div className="flex flex-row">
                  <input
                    type="datetime-local"
                    name="phone"
                    id="phone"
                    placeholder="Mallik"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-r border-t border-b border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    required={true}
                    defaultValue={startTime}
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  End Time
                </label>
                <div className="flex flex-row">
                  <input
                    type="datetime-local"
                    name="phone"
                    id="phone"
                    placeholder="Mallik"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-r border-t border-b border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    required={true}
                    defaultValue={endTime}
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                  <PlusIcon
                    onClick={appendSchedule}
                    className="bg-primary-50 dark:bg-primary-700 ml-3 w-9 rounded-lg border border-l border-gray-300 p-2.5 text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-row items-center justify-center">
              <button
                type="button"
                disabled={addSchedules.isLoading}
                onClick={newSchedules}
                className="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {addSchedules.isLoading ? (
                  <Animation animationSrc="/89101-confirmed-tick.json" />
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ScheduleForm;
