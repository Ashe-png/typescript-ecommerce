import { ChangeEvent, FormEvent } from 'react';
import { Select } from 'antd';
import { IProduct2, ISub } from '../../functions/types';

const { Option } = Select;

type Props = {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  handleCheckChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (index: number) => void;
  handleDescriptionChange: (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  descriptionFields: string[];
  setDescriptionFields: React.Dispatch<React.SetStateAction<string[]>>;
  setValues: React.Dispatch<React.SetStateAction<IProduct2>>;
  values: IProduct2;
  handleCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  subOptions: ISub[];
  showSub: boolean;
};

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  handleDelete,
  descriptionFields,
  setDescriptionFields,
  handleCheckChange,
  handleDescriptionChange,
  setValues,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
}: Props) => {
  const { title, price, categories, brands, subs, quantity } = values;

  const increaseDescription = () => {
    setDescriptionFields([...descriptionFields, '']);
  };

  const handleDChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...descriptionFields];
    values[index] = event.target.value;
    setDescriptionFields(values);
  };

  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full">
      <div className="">
        <span className="formlabel">Title</span>
        <input
          type="text"
          name="title"
          className="forminput inputshadow "
          placeholder="Enter Product Name"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Description</span>
        {descriptionFields.map((description, index) => (
          <div key={index} className="flex-row flex">
            <input
              type="text"
              name={`description[${index}]`}
              className="forminput inputshadow mt-2 "
              placeholder="Enter Product Description"
              value={description}
              onChange={(event) => {
                handleDChange(index, event);
                handleDescriptionChange(index, event);
              }}
            />
            <button
              type="button"
              className="ml-3 mt-2 inline-flex justify-center items-center h-8 outline outline-1 py-1 px-2 rounded-lg bg-red-600 outline-red-600 text-primary-foreground"
              onClick={() => {
                handleDelete(index);
              }}
            >
              delete
            </button>
          </div>
        ))}
        <button
          type="button"
          className="m-3 inline-flex justify-center items-center outline outline-1 h-8 py-1 px-2 rounded-lg bg-green-600 outline-green-600 text-primary-foreground"
          onClick={increaseDescription}
        >
          Add
        </button>
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Price</span>
        <input
          type="Number"
          name="price"
          className="forminput inputshadow "
          placeholder="Enter Product Price"
          value={price}
          onChange={handleChange}
        />
      </div>

      {/* <div className="input-group mb-4">
                <label>Shipping</label>
                <select 
                    name="shipping" 
                    className="form-control"
                    placeholder='Enter Product Name'
                    onChange={handleChange}
                >
                    <option>Please Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>

                </select>
            </div> */}

      <div className="input-group mb-4">
        <span className="formlabel">Quantity</span>
        <input
          type="Number"
          name="quantity"
          className="forminput inputshadow "
          placeholder="Enter Product Quantity"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Color</span>
        <select
          name="color"
          className="forminput inputshadow"
          onChange={handleChange}
        >
          <option>Please Select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Brand</span>
        <select
          name="brand"
          className="forminput inputshadow"
          placeholder="Enter Product Name"
          onChange={handleChange}
        >
          <option>Please Select</option>
          {brands!.length > 0 &&
            brands!.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
        </select>
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Category</span>
        <select
          name="category"
          className="forminput inputshadow"
          placeholder="Enter Product Name"
          onChange={handleCategoryChange}
        >
          <option>Please Select</option>
          {categories!.length > 0 &&
            categories!.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {showSub && (
        <div className="input-group mb-4">
          <span className="formlabel">Sub-Category</span>
          <span className="form-control">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please Select"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </span>
        </div>
      )}

      <div className="input-group mb-4">
        <span className="formlabel">New</span>
        <input type="checkbox" name="news" onChange={handleCheckChange} />
      </div>
      <div className="input-group mb-4">
        <span className="formlabel">BestSeller</span>
        <input type="checkbox" name="bestseller" onChange={handleCheckChange} />
      </div>
      <div className="input-group mb-4">
        <span className="formlabel">Featured</span>
        <input type="checkbox" name="featured" onChange={handleCheckChange} />
      </div>

      <button type="submit" className="btn bg-prim hover:bg-primhigh">
        Submit
      </button>
    </form>
  );
};

export default ProductCreateForm;
