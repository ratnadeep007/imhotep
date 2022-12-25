import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // clear dbs
  await prisma.consultancy.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();

  const doctorsName = ["Malik", "Das", "Anjana"];
  const docsList = [];
  for (const name of doctorsName) {
    const iDoctor = await prisma.doctor.create({
      data: {
        name
      }
    });
    docsList.push(iDoctor);
  }

  const patientNames = [
    "TP1",
    "TP2",
    "TP3",
    "TP4",
    "TP5",
    "TP6",
    "TP7",
    "TP8",
    "TP9"
  ];
  const patientLists = [];
  for (const name of patientNames) {
    const iPatient = await prisma.patient.create({
      data: {
        name: name,
        phone: "123456" + name + "1"
      }
    });
    patientLists.push(iPatient);
  }

  for (const name of patientLists) {
    for (let i = 0; i < patientLists.length; i += 3) {
      if (docsList[0] && patientLists[i]) {
        await prisma.consultancy.create({
          data: {
            complete: false,
            date: new Date(),
            doctorId: docsList[0]?.id || "0",
            patientId: patientLists[i]?.id || "0"
          }
        });
      }
      if (docsList[i + 1] && patientLists[i]) {
        await prisma.consultancy.create({
          data: {
            complete: false,
            date: new Date(new Date().setDate(new Date().getDate() + 1)),
            doctorId: docsList[i + 1]?.id || "0",
            patientId: patientLists[i]?.id || "0"
          }
        });
      }
      if (docsList[i + 2] && patientLists[i]) {
        await prisma.consultancy.create({
          data: {
            complete: false,
            date: new Date(new Date().setDate(new Date().getDate() - 1)),
            doctorId: docsList[i + 2]?.id || "0",
            patientId: patientLists[i]?.id || "0"
          }
        });
      }
    }
  }
}

main();
