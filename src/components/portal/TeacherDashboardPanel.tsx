'use client';

import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BookOpenCheck, Check, ClipboardCheck, Users } from 'lucide-react';
import { TEACHER_CLASSES, type AttendanceMark } from '../../../data/portalDashboards';

const classNames = Array.from(new Set(TEACHER_CLASSES.map((item) => item.name)));

const attendanceStyles: Record<AttendanceMark, string> = {
  Unmarked: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  Present: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300',
  Absent: 'bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-300',
  Late: 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300',
};

export function TeacherDashboardPanel() {
  const [selectedClass, setSelectedClass] = useState(classNames[0]);
  const subjects = useMemo(() => Array.from(new Set(TEACHER_CLASSES.filter((item) => item.name === selectedClass).map((item) => item.subject))), [selectedClass]);
  const [selectedSubject, setSelectedSubject] = useState(TEACHER_CLASSES[0].subject);
  const [attendance, setAttendance] = useState<Record<string, AttendanceMark>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);

  const onSelectClass = (value: string) => {
    setSelectedClass(value);
    setSelectedSubject(TEACHER_CLASSES.find((item) => item.name === value)?.subject ?? '');
    setSaved(false);
  };

  const gradeClass = TEACHER_CLASSES.find((item) => item.name === selectedClass && item.subject === selectedSubject) ?? TEACHER_CLASSES[0];
  const registerStudents = TEACHER_CLASSES
    .filter((item) => item.name === selectedClass)
    .flatMap((item) => item.students)
    .filter((student, index, all) => all.findIndex((candidate) => candidate.id === student.id) === index);
  const currentStudents = gradeClass.students;
  const termAverage = currentStudents.length
    ? currentStudents.reduce((sum, student) => sum + (scores[`${gradeClass.id}:${student.id}`] ?? student.mark), 0) / currentStudents.length
    : 0;
  const overview = classNames.map((name) => {
    const groups = TEACHER_CLASSES.filter((item) => item.name === name);
    return {
      name,
      students: Math.max(...groups.map((group) => group.students.length)),
      average: groups.reduce((sum, group) => sum + group.average, 0) / groups.length,
      attendance: groups.reduce((sum, group) => sum + group.attendanceRate, 0) / groups.length,
    };
  });

  return (
    <section aria-label="Teacher dashboard" className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'My classes', value: `${classNames.length}`, detail: 'Assigned teaching groups', icon: BookOpenCheck },
          { label: 'Students on register', value: `${registerStudents.length}`, detail: selectedClass, icon: Users },
          { label: 'Gradebook average', value: `${termAverage.toFixed(1)}%`, detail: `${selectedClass} · ${selectedSubject}`, icon: ClipboardCheck },
        ].map(({ label, value, detail, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</p>
              <Icon className="h-4 w-4 text-aqua-700 dark:text-aqua-300" />
            </div>
            <p className="mt-2 text-2xl font-black text-charcoal-900 dark:text-white">{value}</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="class-register-title">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-aqua-700 dark:text-aqua-300">Today&apos;s register</p>
              <h2 id="class-register-title" className="mt-1 text-lg font-bold text-charcoal-900 dark:text-white">Class register</h2>
            </div>
            <label className="sr-only" htmlFor="teacher-register-class">Select register class</label>
            <select id="teacher-register-class" value={selectedClass} onChange={(event) => onSelectClass(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-aqua-600 focus:outline-none focus:ring-2 focus:ring-aqua-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              {classNames.map((name) => <option key={name}>{name}</option>)}
            </select>
          </div>
          <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
            {registerStudents.map((student) => {
              const status = attendance[student.id] ?? 'Unmarked';
              return (
                <li key={student.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-1 last:pb-1">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-charcoal-900 dark:text-white">{student.name}</p>
                    <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${attendanceStyles[status]}`}>{status}</span>
                  </div>
                  <div className="flex gap-2" role="group" aria-label={`Mark attendance for ${student.name}`}>
                    <button type="button" onClick={() => setAttendance((current) => ({ ...current, [student.id]: 'Present' }))} aria-pressed={status === 'Present'} className={`rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${status === 'Present' ? 'bg-emerald-700 text-white' : 'border border-emerald-300 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/30'}`}>Present</button>
                    <button type="button" onClick={() => setAttendance((current) => ({ ...current, [student.id]: 'Absent' }))} aria-pressed={status === 'Absent'} className={`rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${status === 'Absent' ? 'bg-rose-700 text-white' : 'border border-rose-300 text-rose-800 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950/30'}`}>Absent</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">Each selection updates today&apos;s register immediately.</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="teacher-gradebook-title">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-300">Continuous assessment</p>
              <h2 id="teacher-gradebook-title" className="mt-1 text-lg font-bold text-charcoal-900 dark:text-white">Gradebook</h2>
            </div>
            <div className="flex gap-2">
              <label className="sr-only" htmlFor="gradebook-class">Gradebook class</label>
              <select id="gradebook-class" value={selectedClass} onChange={(event) => onSelectClass(event.target.value)} className="max-w-32 rounded-lg border border-slate-300 bg-white px-2 py-2 text-xs text-slate-800 focus:border-aqua-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                {classNames.map((name) => <option key={name}>{name}</option>)}
              </select>
              <label className="sr-only" htmlFor="gradebook-subject">Gradebook subject</label>
              <select id="gradebook-subject" value={selectedSubject} onChange={(event) => { setSelectedSubject(event.target.value); setSaved(false); }} className="max-w-32 rounded-lg border border-slate-300 bg-white px-2 py-2 text-xs text-slate-800 focus:border-aqua-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                {subjects.map((subject) => <option key={subject}>{subject}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <tr><th className="py-2 pr-3 font-semibold">Student</th><th className="py-2 text-right font-semibold">Mark / 100</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {currentStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="max-w-48 truncate py-2.5 pr-3 font-medium text-charcoal-900 dark:text-white">{student.name}</td>
                    <td className="py-2 text-right">
                      <label className="sr-only" htmlFor={`mark-${gradeClass.id}-${student.id}`}>Mark for {student.name}</label>
                      <input id={`mark-${gradeClass.id}-${student.id}`} type="number" min="0" max="100" value={scores[`${gradeClass.id}:${student.id}`] ?? student.mark} onChange={(event) => { setScores((current) => ({ ...current, [`${gradeClass.id}:${student.id}`]: Math.max(0, Math.min(100, Number(event.target.value))) })); setSaved(false); }} className="w-20 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-right font-semibold text-charcoal-900 focus:border-aqua-600 focus:outline-none focus:ring-2 focus:ring-aqua-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
            <p className="text-sm font-semibold text-charcoal-900 dark:text-white">Term average <span className="ml-2 text-lg font-black text-aqua-800 dark:text-aqua-300">{termAverage.toFixed(1)}%</span></p>
            <button type="button" onClick={() => setSaved(true)} className="inline-flex items-center gap-2 rounded-lg bg-aqua-700 px-4 py-2 text-xs font-bold text-white hover:bg-aqua-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700">
              <Check className="h-3.5 w-3.5" /> {saved ? 'Marks saved' : 'Save marks'}
            </button>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-labelledby="teacher-classes-title">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-aqua-700 dark:text-aqua-300">Teaching groups</p>
          <h2 id="teacher-classes-title" className="mt-1 text-lg font-bold text-charcoal-900 dark:text-white">My classes overview</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3">
            {overview.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <div>
                  <p className="text-sm font-bold text-charcoal-900 dark:text-white">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{item.students} students · {item.attendance.toFixed(1)}% attendance</p>
                </div>
                <span className="text-sm font-black text-aqua-800 dark:text-aqua-300">{item.average.toFixed(1)}% avg</span>
              </div>
            ))}
          </div>
          <div className="h-52 min-w-0" role="img" aria-label="Average performance by class">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overview} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#475569', fontSize: 11 }} />
                <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Class average']} />
                <Bar dataKey="average" fill="#00A8D6" radius={[5, 5, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </section>
  );
}