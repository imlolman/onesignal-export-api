import { DownloadIcon } from '@heroicons/react/outline';
import { useRef } from 'react';
import confetti from 'canvas-confetti';
import { abbreviateNumber } from '../../lib/utils';
import { App } from '../../pages';

export default function StepFour({ values, setValues }) {
  let confettiCanvas = useRef();

  let confettiTriggerCount = 0;
  let confettiInterval = setInterval(() => {
    if (confettiCanvas.current) {
      let myConfetti = confetti.create(confettiCanvas.current, {
        resize: true,
        useWorker: true,
      });

      var count = 200;
      var defaults = {
        origin: { y: 0.7 },
      };

      const fire = (particleRatio, opts) => {
        confetti(
          Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
          }),
        );
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
    confettiTriggerCount++;
    if (confettiTriggerCount >= 3) {
      clearInterval(confettiInterval);
    }
  }, 1000);

  return (
    <div className="relative p-6 pt-8">
      <div className="pb-3 text-lg font-semibold text-slate-50">Congratulations!</div>
      <div>
        <div className="block text-sm text-slate-300">You can download your csv exports now!</div>
        {values.error ? <div className="mt-1 text-xs text-red-400">{values.errorMessage}</div> : null}
        <div className="">
          {values.apps.map((app: App, index) => {
            return (
              <a className="mt-4 flex max-w-xl cursor-pointer rounded-md bg-background-2 p-3 hover:bg-background-0" key={index.toString()} href={app.csv} download>
                <div className="p-3">
                  <div className="mr-3 h-6 w-6">
                    <DownloadIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="font-bold text-slate-50">{app.name}</div>
                  <div className="text-sm">{app.chrome_web_origin}</div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-4xl font-bold text-slate-50">{abbreviateNumber(app.players)}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <canvas ref={confettiCanvas} />
    </div>
  );
}
