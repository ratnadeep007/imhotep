import { type Doctor, type Patient, type Consultancy } from "@prisma/client";

interface Props {
  consultancy: Consultancy & {
    doctor: Doctor;
    patient: Patient;
  };
}

const ConsultancyListItem: React.FC<Props> = ({ consultancy }) => {
  return (
    <>
      {consultancy && (
        <div className="flex w-full flex-row items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-6 text-base text-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div>{consultancy.patient.name}</div>
          <div>Dr. {consultancy.doctor.name}</div>
          <button
            type="button"
            className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Mark as done
          </button>
        </div>
      )}
    </>
  );
};

export default ConsultancyListItem;
