import React, { ChangeEvent, FormEvent } from 'react';
import { Select } from 'antd';
import { IBrand, ICategory, IProduct2, ISub } from '../../functions/types';

const { Option } = Select;

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCheckChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (index: number) => void;
  handleDescriptionChange: (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  handleCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  descriptionFields: string[];
  setDescriptionFields: React.Dispatch<React.SetStateAction<string[]>>;
  categories: ICategory[];
  brands: IBrand[];
  subOptions: ISub[];
  setValues: React.Dispatch<React.SetStateAction<IProduct2>>;
  values: IProduct2;
  setArrayOfSubs: React.Dispatch<React.SetStateAction<string[]>>;
  arrayOfSubs: string[];
  selectedCategory: string;
};

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  handleDelete,
  descriptionFields,
  setDescriptionFields,
  handleCheckChange,
  handleDescriptionChange,
  handleCategoryChange,
  categories,
  brands,
  subOptions,
  values,
  setArrayOfSubs,
  arrayOfSubs,
  selectedCategory,
}: Props) => {
  const {
    title,
    price,
    category,
    quantity,
    brand,
    color,
    featured,
    bestseller,
    news,
  } = values;

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
              className="forminput inputshadow "
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
          value={price}
          onChange={handleChange}
        />
      </div>

      {/* <div className="input-group mb-4">
            <span className="formlabel">Title</span>
                <select 
                    value={shipping === 'Yes' ? 'Yes' : 'No'}
                    name="shipping" 
                    className="forminput inputshadow "
                    onChange={handleChange}
                >
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
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Color</span>
        <select
          value={color}
          name="color"
          className="forminput inputshadow "
          onChange={handleChange}
        >
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
          value={brand}
          name="brand"
          className="forminput inputshadow "
          onChange={handleChange}
        >
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
          value={selectedCategory ? selectedCategory : category}
          name="category"
          className="forminput inputshadow "
          onChange={handleCategoryChange}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <span className="formlabel">Sub-Category</span>
        <br />
        <Select
          mode="multiple"
          className="max-w-[514px] w-full"
          placeholder="Please Select"
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>
      <div className="input-group mb-4">
        <span className="formlabel">New</span>
        <input
          type="checkbox"
          name="news"
          checked={news}
          onChange={handleCheckChange}
        />
      </div>
      <div className="input-group mb-4">
        <span className="formlabel">BestSeller</span>
        <input
          type="checkbox"
          name="bestseller"
          checked={bestseller}
          onChange={handleCheckChange}
        />
      </div>
      <div className="input-group mb-4">
        <span className="formlabel">Featured</span>
        <input
          type="checkbox"
          name="featured"
          checked={featured}
          onChange={handleCheckChange}
        />
      </div>

      <button type="submit" className="btn bg-prim hover:bg-primhigh">
        Save
      </button>
    </form>
  );
};

export default ProductUpdateForm;
