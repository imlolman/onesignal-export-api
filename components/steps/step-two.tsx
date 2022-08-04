import { CheckIcon } from '@heroicons/react/outline';
import { App } from '../../pages/index';
import { abbreviateNumber } from '../../lib/utils';

export default function StepTwo({ values, setValues }: { values: any; setValues: any }) {
  return (
    <div className="relative p-6 pt-8">
      <div className="pb-3 text-lg font-semibold text-slate-50">Select Apps</div>
      <div>
        <div className="block text-sm text-slate-300">Choose apps your want to export</div>
        {values.error ? <div className="mt-1 text-xs text-red-400">{values.errorMessage}</div> : null}
        <div className="">
          {values.apps.map((app: App, index) => {
            return (
              <div
                className="mt-4 flex max-w-xl cursor-pointer rounded-md bg-background-2 p-3 hover:bg-background-0"
                key={index.toString()}
                onClick={() => {
                  let arr = [...values.apps];
                  arr[index].checked = !arr[index].checked;
                  setValues({
                    ...values,
                    apps: arr,
                  });
                }}
              >
                <div className="p-3">
                  <div className="mr-3 h-6 w-6 rounded-md bg-background-3">{values.apps[index].checked ? <CheckIcon className="h-6 w-6 text-white" /> : null}</div>
                </div>
                <div className="flex-grow">
                  <div className="font-bold text-slate-50">{app.name}</div>
                  <div className="text-sm">{app.chrome_web_origin}</div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-4xl font-bold text-slate-50">{abbreviateNumber(app.players)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
