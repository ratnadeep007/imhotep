import { UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import Animation from "./Animation";

interface Props {
  showCancel?: boolean;
  callbackFn?: (...args: unknown[]) => unknown;
}

const DoctorForm: React.FC<Props> = ({ showCancel, callbackFn }) => {
  const [name, setName] = useState("");

  const addDoctor = trpc.doctor.addDoctor.useMutation();

  const newDoctor = async () => {
    if (name && name.length >= 3) {
      await addDoctor.mutateAsync({
        name
      });
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Doctor Name
            </label>
            <div className="flex flex-row">
              <UserIcon className="w-9 rounded-l-lg border-l border-t border-b border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Mallik"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-r-lg border-r border-t border-b border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <button
              disabled={addDoctor.isLoading}
              onClick={newDoctor}
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            >
              {addDoctor.isLoading ? (
                <Animation animationSrc="/89101-confirmed-tick.json" />
              ) : (
                <span>Add</span>
              )}
            </button>
            {showCancel ? (
              <button
                onClick={callbackFn}
                type="button"
                className="w-full rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </section>
    </>
  );
};

export default DoctorForm;
