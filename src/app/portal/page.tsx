import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { ProgressBar } from '@/components/ui/ProgressBar';

const portalCards = [
  { title: 'Student Portal', description: 'Track class performance, attendance and assignments.', href: '/portal/student' },
  { title: 'Teacher Portal', description: 'Manage lessons, attendance and grading workflows.', href: '/portal/teacher' },
  { title: 'Parent Portal', description: 'Review fees, communication and learner progress.', href: '/portal/parent' },
  { title: 'Admin Console', description: 'Supervise admissions, academics and school operations.', href: '/portal/admin' },
];

export default function PortalHomePage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <Section eyebrow="Portal" title="School management dashboard" description="Access role-based services for students, parents, teachers and administration." className="mb-8">
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary">Login</Button>
            <Button variant="secondary">Register</Button>
          </div>
        </Section>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {portalCards.map((card) => (
            <Link key={card.title} href={card.href} className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700">
            <Card hoverEffect className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-aqua">Portal</p>
              <h3 className="mt-4 text-xl font-bold text-charcoal">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
              <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-aqua transition-all hover:text-aqua-700">
                Open dashboard →
              </span>
            </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6">
            <h3 className="text-2xl font-bold text-charcoal">Operational overview</h3>
            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>Attendance</span>
                  <span>94%</span>
                </div>
                <ProgressBar value={94} color="aqua" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>Fee collection</span>
                  <span>86%</span>
                </div>
                <ProgressBar value={86} color="gold" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>Academic completion</span>
                  <span>91%</span>
                </div>
                <ProgressBar value={91} color="charcoal" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-2xl font-bold text-charcoal">Quick actions</h3>
            <div className="mt-6 space-y-3">
              <Button variant="primary" className="w-full justify-center">New admission</Button>
              <Button variant="secondary" className="w-full justify-center">Announcements</Button>
              <Button variant="gold" className="w-full justify-center">Fee reviews</Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
