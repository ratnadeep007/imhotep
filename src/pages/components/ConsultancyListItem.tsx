import { type Doctor, type Patient } from "@prisma/client";
import { trpc } from "../../utils/trpc";

interface Props {
  consultancy: {
    id: bigint;
    date: string;
    doctorId: string;
    patientId: string;
    complete: boolean;
} & {
    doctor: Doctor;
    patient: Patient;
  };
}

const ConsultancyListItem: React.FC<Props> = ({ consultancy }) => {
  const mutateConsul = trpc.consultancy.updateBookings.useMutation();

  const mutateConsultancy = async () => {
    await mutateConsul.mutateAsync({
      id: Number(consultancy.id.toString()),
      type: "MARK_DONE",
    })
  }

  return (
    <>
      {consultancy && (
        <div className="flex w-full flex-row items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-6 text-base text-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div>{consultancy.patient.name}</div>
          <div>Dr. {consultancy.doctor.name}</div>
          <button
            onClick={mutateConsultancy}
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
