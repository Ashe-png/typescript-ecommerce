import { FormEvent } from 'react';

type Props = {
  handleSubmit: (e: FormEvent) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryForm = ({ handleSubmit, name, setName }: Props) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full ">
      <span className="text-sm font-medium leading-none">Name</span>
      <input
        type="text"
        className="forminput inputshadow "
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md font-normal text-primary-foreground cursor-pointer h-10 px-2 py-1 mt-2 hover:bg-primhigh bg-prim "
      >
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
