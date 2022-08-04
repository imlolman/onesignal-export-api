import { CheckIcon } from '@heroicons/react/outline';

export default function Checkbox({ value = false, onChange = value => {}, disabled = false, className = '', text = '', ...props }) {
  const handleChange = () => {
    if (disabled) return;
    onChange(!value);
  };
  return (
    <div className={'mt-2 flex cursor-pointer items-center ' + (disabled ? 'opacity-50' : '')} onClick={handleChange}>
      <div className={'inline-block h-6 w-6 rounded-md ' + className} {...props}>
        {value && <CheckIcon className="h-6 w-6 text-white" />}
      </div>
      <div className="ml-1">{text}</div>
    </div>
  );
}
