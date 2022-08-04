import Checkbox from '../checkbox';

export default function StepThree({ values, setValues }) {
  return (
    <div className="relative p-6 pt-8">
      <div className="pb-3 text-lg font-semibold text-slate-50">Choose Fields</div>
      <div>
        <div className="block text-sm text-slate-300">Choose fields you want to export</div>
        <div className="mt-3">
          {values.fields.map((columnName, index) => {
            return (
              <div className="inline-block w-1/2 md:w-1/4" key={index.toString()}>
                <Checkbox
                  className="mr-2 bg-background-2"
                  text={columnName.id}
                  disabled={columnName.disabled}
                  name={columnName.name}
                  value={columnName.value}
                  onChange={v => {
                    let newValues = { ...values };
                    newValues.fields[index].value = v;
                    setValues(newValues);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
