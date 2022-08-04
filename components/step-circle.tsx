export default function StepCircle({ step, active }: { step: number; active: boolean }) {
  const activeClasses = active ? 'text-background-0 bg-slate-100' : 'text-slate-100 bg-background-0';
  return (
    <div className="">
      <div className={'flex h-[48px] w-[48px] items-center justify-center rounded-full ' + activeClasses}>
        <div className="text-[25px] font-bold leading-[30px]">{step}</div>
      </div>
    </div>
  );
}
