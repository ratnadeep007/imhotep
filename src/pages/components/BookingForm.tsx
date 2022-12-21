import { type NextPage } from "next";
import { type ChangeEvent, type MouseEvent, useState, useRef } from "react";
import { trpc } from "../../utils/trpc";

import Animation from "./Animation";

const BookingForm: NextPage = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [docId, setDocId] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  const allDoctors = trpc.doctor.doctors.useQuery();
  const mutateBooking = trpc.consultancy.createBooking.useMutation();

  const setDoctor = (e: ChangeEvent<HTMLSelectElement>) => {
    setDocId(e.target.value);
  };

  const createBooking = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const obj = {
      name,
      doctor: docId,
      date,
      phone
    };
    // mutateBooking.mutate(obj);
    console.log(obj);
    // add hidden and remove flex to form
    formRef.current?.classList.add("hidden");
    formRef.current?.classList.remove("flex");

    // do reverse of above for success modal
    successRef.current?.classList.remove("hidden");
    successRef.current?.classList.add("flex");

    setIsFlipped(true);
  };

  const reset = () => {
    // add hidden and remove flex to form
    formRef.current?.classList.add("flex");
    formRef.current?.classList.remove("hidden");

    // do reverse of above for success modal
    successRef.current?.classList.remove("flex");
    successRef.current?.classList.add("hidden");
    
    setIsFlipped(false);
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div
          ref={formRef}
          className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
        >
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          Flowbite    
      </a> */}
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Enter patient details
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Patient Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="Rohan Ghosh"
                    required={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="9876543210"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    required={true}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    required={true}
                    value={date.toString()}
                    onChange={(e) => setDate(new Date(e.target.value))}
                  />
                </div>
                <div>
                  <label
                    htmlFor="doc_name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Doctor Name
                  </label>
                  <select
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    defaultValue={"123"}
                    onChange={setDoctor}
                  >
                    <option disabled value={"123"}>
                      Select a doctor
                    </option>
                    {allDoctors.isLoading
                      ? null
                      : allDoctors.data?.map((doc) => (
                          <option value={doc.id} key={doc.id}>
                            Dr. {doc.name}
                          </option>
                        ))}
                  </select>
                </div>
                <button
                  onClick={createBooking}
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
        <div
          ref={successRef}
          className="mx-auto hidden flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
        >
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              {
                isFlipped && <Animation animationSrc="/89101-confirmed-tick.json" />
              }
              <div className="text-lg text-white">
                Your booking has been saved and we will contact you soon.
              </div>
              <button
                onClick={reset}
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                Booking New
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingForm;
