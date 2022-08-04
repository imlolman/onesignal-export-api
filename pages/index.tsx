import { ArrowLeftIcon, ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import StepCircle from '../components/step-circle';
import StepFour from '../components/steps/step-four';
import StepOne from '../components/steps/step-one';
import StepThree from '../components/steps/step-three';
import StepTwo from '../components/steps/step-two';
import OnesignalApi from '../lib/api';
import { columnNames } from '../lib/columns';

export interface App {
  id: string;
  name: string;
  chrome_web_origin: string;
  site_name: string;
  players: number;
  messageable_players: number;
  basic_auth_key: string;
  csv: string | undefined;
  checked: boolean | undefined;
}

export default function IndexPage() {
  // Current step of the wizard
  const [step, setStep] = useState(1);

  // Buttons to move between steps
  const [previous, setPrevious] = useState(false);
  const [next, setNext] = useState(true);

  // Loading screen while the API is fetching data
  const [loading, setLoading] = useState(false);

  // State for all individual the steps
  const [step1, setStep1] = useState({
    authKey: {
      value: '',
      error: false,
      errorMessage: '',
    },
  });
  const [step2, setStep2] = useState({
    apps: [],
    error: false,
    errorMessage: '',
  });
  const [step3, setStep3] = useState({
    fields: columnNames,
  });
  const [step4, setStep4] = useState({});

  // Functions to move between steps
  const handleNext = async () => {
    if (step === 1) {
      const onesignalApi = new OnesignalApi(step1.authKey.value);
      setLoading(true);
      const res = await onesignalApi.getApps();
      setLoading(false);
      if (res.status === 200) {
        let data: App[] = await res.json();
        for (let i = 0; i < data.length; i++) {
          data[i].checked = false;
        }
        setStep2({
          ...step2,
          apps: data,
        });
        setStep(2);
        setPrevious(true);
        return;
      }

      setStep1({
        ...step1,
        authKey: {
          ...step1.authKey,
          error: true,
          errorMessage: 'Invalid auth key',
        },
      });
    } else if (step === 2) {
      const isOneChecked = step2.apps.reduce((a, b) => a || b);
      if (!isOneChecked) {
        setStep2({
          ...step2,
          error: true,
          errorMessage: 'Please select at least one app',
        });
        return;
      }
      setStep(3);
      setPrevious(true);
    } else if (step === 3) {
      let selectedApps = step2.apps.map((app, index) => {
        if (app.checked) {
          return step2.apps[index];
        }
        return null;
      });

      selectedApps = selectedApps.filter(app => app !== null);
      let selectedFields = step3.fields.filter(field => {
        return field.canBeDisabled && field.value;
      });

      const requests = [];
      const onesignalApi = new OnesignalApi(step1.authKey.value);
      selectedApps.forEach(app => {
        requests.push(
          onesignalApi.getCsvExport(
            app.basic_auth_key,
            app.id,
            selectedFields.map(field => field.id),
          ),
        );
      });

      setLoading(true);
      const responses = await Promise.all(requests).then(results => Promise.all(results.map(r => r.json())));
      setLoading(false);
      selectedApps = selectedApps.map((app, index) => {
        return {
          ...app,
          csv: responses[index].csv_file_url,
        };
      });
      setStep4({
        ...step4,
        apps: selectedApps,
      });
      setStep(4);
      setNext(false);
    }
  };

  const handlePrevious = () => {
    if (step === 2) {
      setStep(1);
      setPrevious(false);
      setNext(true);
    } else if (step === 3) {
      setStep(2);
      setPrevious(true);
      setNext(true);
    } else if (step === 4) {
      setStep(3);
      setPrevious(true);
      setNext(true);
    }
  };

  return (
    <div>
      <div className="m-5 mt-6 grid max-w-4xl grid-cols-1 md:m-0 md:mx-auto md:mt-10">
        <div className="my-3">
          <h1 className="text-4xl font-bold text-white">Onesignal Export using API</h1>
          <p className="mt-3 text-sm text-slate-300">Export tokens using Onesignal API which includes multiple extra fields.</p>
        </div>
        <div className="relative mt-3 rounded-xl bg-background-2 p-4 pr-16">
          <div className="flex items-start space-x-2.5 text-green-500">
            <ShieldCheckIcon className="h-6 w-6 flex-shrink-0" />
            <div>
              <div className="mt-0.5 text-sm font-semibold">You can trust us!</div>
              <div className="mt-1 text-xs font-medium text-text-muted">We don’t save your api keys, however we recommend you to generate new Auth keys after you are done with the export.</div>
            </div>
          </div>
        </div>
        <div className="relative mt-6 rounded-xl bg-background-3">
          <div className="absolute right-3 top-3 rounded-full border-2 border-background-3">
            <StepCircle step={step} active={false} />
          </div>
          <div className="absolute top-3 right-6 rounded-full border-2 border-background-3">
            <StepCircle step={step} active={false} />
          </div>
          <div className="absolute top-3 right-9 rounded-full border-2 border-background-3">
            <StepCircle step={step} active={true} />
          </div>
          {step === 1 && <StepOne values={step1} setValues={setStep1} />}
          {step === 2 && <StepTwo values={step2} setValues={setStep2} />}
          {step === 3 && <StepThree values={step3} setValues={setStep3} />}
          {step === 4 && <StepFour values={step4} setValues={setStep4} />}
          <div>
            <div className="m-6 mt-0 flex gap-2">
              <div className="w-1/2 md:w-auto">
                <button
                  className="group inline-flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-secondary bg-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-secondary-accent hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-secondary disabled:hover:bg-secondary disabled:hover:text-white md:w-32"
                  disabled={!previous}
                  onClick={handlePrevious}
                >
                  <ArrowLeftIcon className={'mr-2 h-4 w-4 transition-transform duration-200 ' + (previous ? 'group-hover:-translate-x-1' : '')} /> Previous
                </button>
              </div>
              <div className="w-1/2 md:w-auto">
                <button
                  className="group inline-flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white md:w-32"
                  disabled={!next}
                  onClick={handleNext}
                >
                  Next <ArrowRightIcon className={'ml-2 h-4 w-4 transition-transform duration-200 ' + (next ? 'group-hover:translate-x-1' : '')} />
                </button>
              </div>
            </div>
          </div>
          {loading && (
            <div className="fixed inset-0 z-10 grid place-content-center bg-black opacity-75">
              <svg className="mr-3 -ml-1 h-10 w-10 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
