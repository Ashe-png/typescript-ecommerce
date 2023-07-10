import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';

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

      <Button type="submit" className="bg-prim">
        Submit
      </Button>
    </form>
  );
};

export default CategoryForm;
