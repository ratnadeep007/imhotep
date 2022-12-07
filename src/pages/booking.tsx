import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { ChangeEvent, InputHTMLAttributes, MouseEventHandler, useState } from "react";
import { trpc } from "../utils/trpc";

const Booking: NextPage = () => {
  const [name, setName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState(new Date())
  const [docId, setDocId] = useState('');
  const [phone, setPhone] = useState('');
  const [days, setDays] = useState('');
  const [time, setTime] = useState('');

  const { data: sessionData } = useSession();

  const mutatedoctor = trpc.doctor.addDoctor.useMutation();
  const allDoctors = trpc.doctor.doctors.useQuery();
  const mutatebooking = trpc.consultancy.createBooking.useMutation();

  const setDoctor = (e: ChangeEvent<HTMLSelectElement>) => {
    setDocId(e.currentTarget.value);
  }
  
  const addDoctor = async (e: any) => {
    e.preventDefault();
    mutatedoctor.mutate({ name });
  }

  // const fixdays = (day: string) => {
  //   if (days?.includes(day)) {
  //     const d = days.filter(item => item !== day);
  //     setDays(d);
  //   } else {
  //     let d = days;
  //     d?.push(day);
  //     setDays(d);
  //   }
  // }

  // const fixtimes = (e: any) => {
  //   const ti = e.target.value;
  //   if (time?.includes(ti)) {
  //     const t = time.filter(f => f !== ti);
  //     setTime(t);
  //   } else {
  //     let t = time;
  //     t?.push(ti);
  //     setTime(t);
  //   }
  // }

  const createBooking = async (e: any) => {
    e.preventDefault();
    const obj = {
      name: patientName,
      doctor: docId,
      date: date,
      phone: phone
    };
    mutatebooking.mutate(obj);
  }

  return (
    <>
      <Head>
        <title>Imhotep</title>
        <meta name="description" content="Hospital Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <form className="flex flex-col gap-3 w-1/2 px-9">
          <input onChange={e => setPatientName(e.target.value)} type="text" name="name" placeholder="Name" className="p-3 rounded-lg" />
          <input onChange={e => setPhone(e.target.value)} type="text" name="phone" placeholder="Phone" className="p-3 rounded-lg" />
          <input onChange={e => setDate(new Date(e.target.value))} type="date" className="p-3 rounded-lg" />
          <select className="p-3 rounded-lg" defaultValue={'123'} onChange={setDoctor}>
            <option disabled value={'123'}>Select a doctor name</option>
            {
              allDoctors.isLoading ? null :
              allDoctors.data?.map(doc => <option value={doc.id} key={doc.id}>Dr. {doc.name}</option>)
            }
          </select>
          <button
            onClick={createBooking} 
            className="text-white p-3 bg-green-600 rounded-lg hover:bg-green-900"
          >Submit</button>
        </form>
          {
            sessionData && <form className="flex flex-col gap-3 w-1/2 px-9">
              <div className="text-red-600 font-bold text-lg">Will be removed just for testing purpose of login!</div>
              <input
                value={name}
                onChange={e => setName(e.target.value)} 
                type="text" 
                name="doctor_name" 
                placeholder="Doctor Name" 
                className="p-3 rounded-lg " />
              <input
                value={days}
                onChange={e => setDays(e.target.value)} 
                type="text" 
                name="days" 
                placeholder="Days (comma seperated): MON,TUE,WED" 
                className="p-3 rounded-lg " />
              <input
                value={time}
                onChange={e => setTime(e.target.value)} 
                type="text" 
                name="doctor_name" 
                placeholder="Times (comma seperated): 7:30pm,10:30pm" 
                className="p-3 rounded-lg " />
              {/* <div className="text-white font-bold">Select days when this doctor is availible:</div>
              <div className="grid gap-3 grid-cols-3">
                <div>
                  <input onChange={_ => fixdays("monday")} type="checkbox" name="monday" id="monday" />
                  <label htmlFor="monday" className="text-white ml-3">Monday</label>
                </div>
                <div>
                  <input onChange={_ => fixdays("tuesday")} type="checkbox" name="tuesday" id="tuesday" />
                  <label htmlFor="tuesday" className="text-white ml-3">Tuesday</label>
                </div>
                <div>
                  <input onChange={_ => fixdays("wednesday")} type="checkbox" name="wednesday" id="wednesday" />
                  <label htmlFor="wednesday" className="text-white ml-3">Wednesday</label>
                </div>
                <div>
                  <input onChange={_ => fixdays("thursday")} type="checkbox" name="thursday" id="thursday" />
                  <label htmlFor="thursday" className="text-white ml-3">Thursday</label>
                </div>
                <div>
                  <input onChange={_ => fixdays("friday")} type="checkbox" name="friday" id="friday" />
                  <label htmlFor="friday" className="text-white ml-3">Friday</label>
                </div>
                <div>
                  <input onChange={_ => fixdays("saturday")} type="checkbox" name="satuday" id="satuday" />
                  <label htmlFor="satuday" className="text-white ml-3">Saturday</label>
                </div>
                <div>
                  <input onChange={_ => fixdays("sunday")} type="checkbox" name="sunday" id="sunday" />
                  <label htmlFor="sunday" className="text-white ml-3">Sunday</label>
                </div>
              </div>
              <input type="time" onChange={e => fixtimes(e)} placeholder="Time comma seperated" className="p-3 rounded-lg" />
              {
                time?.map(t => <div>{t}</div>)
              } */}
              <button
                onClick={e => addDoctor(e)} 
                className="text-white p-3 bg-green-600 rounded-lg hover:bg-green-900"
              >Submit</button>
          </form>
          }
      </main>
    </>
  );
};

export default Booking;