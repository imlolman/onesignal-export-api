import { QuestionMarkCircleIcon, XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function StepOne({
  values,
  setValues,
}: {
  values: {
    authKey: {
      value: string;
      error: boolean;
      errorMessage: string;
    };
  };
  setValues: CallableFunction;
}) {
  const [authKeyPopup, setAuthKeyPopup] = useState(false);

  return (
    <div className="relative p-6 pt-8">
      <div className="pb-3 text-lg font-semibold text-slate-50">Auth Key</div>
      <div>
        <div className="block text-sm text-slate-300">
          Enter your auth key here <QuestionMarkCircleIcon className="ml-1 inline w-4 cursor-pointer" onClick={() => setAuthKeyPopup(true)} />
        </div>
        <input
          id="auth-key"
          name="auth-key"
          onInput={e => setValues({ ...values, authKey: { value: (e.target as HTMLInputElement).value, error: false, errorMessage: '' } })}
          className={
            'mt-3 block w-full rounded-xl border-2 border-border bg-transparent px-4 py-2.5 text-white outline-none transition-all duration-150 ease-in-out placeholder:text-input-placeholder focus:border-primary focus:outline-none focus:ring-0 sm:text-sm md:w-2/3 ' +
            (values.authKey.error ? 'duration-50 border-red-500 focus:border-red-500' : '')
          }
          value={values.authKey.value}
          autoComplete="on"
        />
        {values.authKey.error ? <div className="mt-1 text-xs text-red-400">{values.authKey.errorMessage}</div> : null}
      </div>
      {authKeyPopup && (
        <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center backdrop-blur-sm">
          <div className="bg-red relative max-w-3xl overflow-hidden rounded-2xl">
            <motion.img src="get-auth-key.png" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }} />
            <div className="absolute bottom-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-background-1 bg-opacity-20 hover:bg-opacity-30" onClick={() => setAuthKeyPopup(false)}>
              <XIcon className="h-4 w-4 font-bold text-background-0" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
